/**
 * Extend the basic ItemSheet with custom functionality
 */
export class LordOfMysteriesItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["lord-of-mysteries", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/lord-of-mysteries/templates/item";
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /** @override */
  async getData() {
    const context = super.getData();

    const itemData = this.item.toObject(false);
    context.system = itemData.system;
    context.flags = itemData.flags;

    // 행동 타입 선택지
    context.actionTypes = {
      'attack': '공격',
      'cast': '시전',
      'move': '이동',
      'swift': '신속',
      'free': '자유'
    };

    // 판정 타입 선택지
    context.checkTypes = {
      'skill': '기능',
      'attribute': '속성',
      'none': '없음'
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

    // 속성 선택지
    context.attributes = {
      'strength': '힘',
      'dexterity': '민첩',
      'willpower': '의지',
      'health': '건강',
      'charm': '매력',
      'inspiration': '영감',
      'luck': '행운',
      'education': '교육'
    };

    // 기능 선택지 (속성.기능 형태)
    context.skills = this._getSkillOptions();

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here
  }

  /**
   * 기능 선택지 생성
   */
  _getSkillOptions() {
    const skills = {};
    
    const skillMap = {
      strength: {
        climbing: '등반',
        throwing: '투척',
        meleeCombat: '격투(육박)',
        melee1: '격투1',
        melee2: '격투2',
        intimidation: '위협',
        jump: '도약',
        animalHandling: '조련'
      },
      dexterity: {
        stealth: '잠행',
        sleightOfHand: '묘수',
        swimming: '수영',
        ranged1: '사격1',
        ranged2: '사격2',
        ranged3: '사격3',
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
        art1: '예술1',
        art2: '예술2',
        art3: '예술3',
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
        survival: '생존'
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

    for (const [attr, skillList] of Object.entries(skillMap)) {
      for (const [skillKey, skillName] of Object.entries(skillList)) {
        skills[`${attr}.${skillKey}`] = `${skillName} (${this._getAttributeLabel(attr)})`;
      }
    }

    return skills;
  }

  /**
   * 속성 라벨 반환
   */
  _getAttributeLabel(attr) {
    const labels = {
      'strength': '힘',
      'dexterity': '민첩',
      'willpower': '의지',
      'health': '건강',
      'charm': '매력',
      'inspiration': '영감',
      'luck': '행운',
      'education': '교육'
    };
    return labels[attr] || attr;
  }
}
