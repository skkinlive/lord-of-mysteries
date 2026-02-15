/**
 * Extend the basic ActorSheet with custom functionality
 */
export class LordOfMysteriesActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["lord-of-mysteries", "sheet", "actor"],
      width: 800,
      height: 900,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
    });
  }

  /** @override */
  get template() {
    return `systems/lord-of-mysteries/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /** @override */
  async getData() {
    const context = super.getData();
    
    const actorData = this.actor.toObject(false);
    context.system = actorData.system;
    context.flags = actorData.flags;

    // 기능 레벨 선택지
    context.skillLevels = {
      'untrained': '훈련 안됨',
      'trained': '훈련됨',
      'skilled': '숙련됨',
      'advanced': '진척됨',
      'expert': '정통함',
      'master': '박학함',
      'grandmaster': '대가'
    };

    // 행동 타입 선택지
    context.actionTypes = {
      'attack': '공격',
      'cast': '시전',
      'move': '이동',
      'swift': '신속',
      'free': '자유'
    };

    // 아이템 사이즈 선택지
    context.itemSizes = {
      'tiny': '매우 작은',
      'small': '작은',
      'medium-small': '중소',
      'medium': '중간',
      'medium-large': '중대',
      'large': '대형'
    };

    // 서열 선택지 (9~0)
    context.ranks = {};
    for (let i = 9; i >= 0; i--) {
      context.ranks[i] = `${i}서열`;
    }

    // 아이템 분류
    context.actions = actorData.items.filter(i => i.type === 'action');
    context.items = actorData.items.filter(i => i.type === 'item');
    context.abilities = actorData.items.filter(i => i.type === 'ability');

    // 속성 이름 매핑
    context.attributeNames = {
      'strength': '힘',
      'dexterity': '민첩',
      'willpower': '의지',
      'health': '건강',
      'charm': '매력',
      'inspiration': '영감',
      'luck': '행운',
      'education': '교육'
    };

    // 기능 이름 매핑
    context.skillNames = this._getSkillNames();

    // 상태 이상 목록
    context.statusEffects = [
      { id: 'unbalanced', label: '균형 잃음' },
      { id: 'helpless', label: '무력함' },
      { id: 'silenced', label: '침묵' },
      { id: 'restrained', label: '속박' },
      { id: 'injustice', label: '불의' },
      { id: 'stunned', label: '기절' },
      { id: 'blinded', label: '실명' },
      { id: 'deafened', label: '청각 상실' },
      { id: 'invisible', label: '투명화' },
      { id: 'frightened', label: '공포' },
      { id: 'enraged', label: '분노' },
      { id: 'bleeding-severe', label: '출혈 과다' },
      { id: 'bleeding', label: '출혈' },
      { id: 'dead', label: '사망' }
    ];

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // 속성 굴림
    html.find('.attribute-roll').click(this._onAttributeRoll.bind(this));

    // 기능 굴림
    html.find('.skill-roll').click(this._onSkillRoll.bind(this));

    // 이성 판정
    html.find('.sanity-roll').click(this._onSanityRoll.bind(this));

    // 우선권 굴림
    html.find('.initiative-roll').click(this._onInitiativeRoll.bind(this));

    // 아이템 생성
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // 아이템 편집
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // 아이템 삭제
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // 아이템 사용/굴림
    html.find('.item-roll').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      if (item) item.roll();
    });

    // Drag events for macros
    if (this.actor.isOwner) {
      let handler = ev => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
  }

  /**
   * 속성 굴림 처리
   */
  async _onAttributeRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const attributeKey = element.dataset.attribute;
    const attributeName = element.dataset.label;

    await this.actor.rollAttribute(attributeKey, attributeName);
  }

  /**
   * 기능 굴림 처리
   */
  async _onSkillRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const attribute = element.dataset.attribute;
    const skillKey = element.dataset.skill;
    const skillName = element.dataset.label;

    await this.actor.rollSkill(attribute, skillKey, skillName);
  }

  /**
   * 이성 판정 처리
   */
  async _onSanityRoll(event) {
    event.preventDefault();
    await this.actor.rollSanity();
  }

  /**
   * 우선권 굴림 처리
   */
  async _onInitiativeRoll(event) {
    event.preventDefault();
    await this.actor.rollInitiative();
  }

  /**
   * 아이템 생성 처리
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemType = element.dataset.type;
    
    const itemData = {
      name: `새로운 ${this._getItemTypeLabel(itemType)}`,
      type: itemType,
      system: {}
    };

    return await Item.create(itemData, {parent: this.actor});
  }

  /**
   * 아이템 타입 라벨 반환
   */
  _getItemTypeLabel(type) {
    const labels = {
      'action': '행동',
      'item': '물품',
      'ability': '능력'
    };
    return labels[type] || type;
  }

  /**
   * 기능 이름 매핑 반환
   */
  _getSkillNames() {
    return {
      strength: {
        climbing: '등반',
        throwing: '투척',
        meleeCombat: '격투(육박)',
        melee1: '격투',
        melee2: '격투',
        intimidation: '위협',
        jump: '도약',
        animalHandling: '조련'
      },
      dexterity: {
        stealth: '잠행',
        sleightOfHand: '묘수',
        swimming: '수영',
        ranged1: '사격',
        ranged2: '사격',
        ranged3: '사격',
        artillery: '포술',
        lockpicking: '자물쇠',
        dodge: '회피',
        driving: '운전',
        heavyMachinery: '중장비'
      },
      inspiration: {
        listening: '청취',
        observation: '관찰',
        mechanicalRepair: '기계 수리',
        occultism: '신비학',
        psychology: '심리학',
        cooking: '요리',
        art1: '예술',
        art2: '예술',
        art3: '예술',
        tracking: '추적',
        lipReading: '독순'
      },
      education: {
        navigation: '항해',
        trade: '무역',
        medicine: '의학',
        libraryUse: '도서관 사용',
        writing: '작문',
        demolitions: '폭파',
        survival: '생존',
        scholarship1: '학식',
        scholarship2: '학식',
        scholarship3: '학식',
        scholarship4: '학식',
        scholarship5: '학식',
        scholarship6: '학식',
        occultLanguage1: '신비학 언어',
        occultLanguage2: '신비학 언어',
        occultLanguage3: '신비학 언어',
        occultLanguage4: '신비학 언어',
        commonLanguage1: '상용어',
        commonLanguage2: '상용어',
        commonLanguage3: '상용어',
        commonLanguage4: '상용어'
      },
      charm: {
        bringJoy: '기쁨 주기',
        deception: '속임수',
        rhetoric: '화술',
        persuasion: '설득',
        psychologicalManipulation: '심리 유도',
        performance: '공연',
        disguise: '변장',
        credit: '신용'
      }
    };
  }
}
