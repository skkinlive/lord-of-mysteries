/**
 * Extend the base Actor document
 */
export class LordOfMysteriesActor extends Actor {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /** @override */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.lordofmysteries || {};

    // Make modifications to data here
    this._prepareCharacterData(actorData);
  }

  /**
   * Prepare Character specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    const systemData = actorData.system;
    const attrs = systemData.attributes;
    const stats = systemData.stats;
    const info = systemData.info;

    // 승급한 서열 수 계산 (9서열=1, 8서열=2, 7서열=3...)
    const rankProgression = 10 - info.currentRank;

    // 영성 계산: 초기 의지 + 초기 영감 + (현재 영감 × 승급한 서열 수)
    stats.spirituality.max = attrs.willpower.initial + attrs.inspiration.initial + 
                             (attrs.inspiration.value * rankProgression);
    
    // 이성 계산: 의지 + 10
    stats.sanity.max = attrs.willpower.value + 10;

    // 생명력 계산: 건강 + 10 + (서열 상승 시 현재 건강만큼 증가)
    stats.hp.max = attrs.health.value + 10 + (attrs.health.value * (rankProgression - 1));

    // 이동 계산: 힘 + 민첩
    stats.movement.value = attrs.strength.value + attrs.dexterity.value;

    // 물리 방어 계산: 10 + 민첩 + 회피 기능
    const dodgeBonus = this._getSkillBonus('dexterity', 'dodge');
    stats.defensePhysical.value = 10 + attrs.dexterity.value + dodgeBonus;

    // 의지 방어 계산: 10 + 의지
    stats.defenseWillpower.value = 10 + attrs.willpower.value;

    // 건강 방어 계산: 10 + 건강
    stats.defenseHealth.value = 10 + attrs.health.value;
  }

  /**
   * 기능 등급에 따른 가산점 반환
   */
  _getSkillBonus(attribute, skillKey) {
    const skill = this.system.skills[attribute]?.[skillKey];
    if (!skill) return -4;

    const bonuses = {
      'untrained': -4,
      'trained': 2,
      'skilled': 4,
      'advanced': 5,
      'expert': 6,
      'master': 7,
      'grandmaster': 8
    };

    return bonuses[skill.level] || -4;
  }

  /**
   * 우선권 굴림
   */
  async rollInitiative() {
    const dexBonus = this.system.attributes.dexterity.value;
    const roll = new Roll("1d20 + @dex", { dex: dexBonus });
    await roll.evaluate();
    
    const speaker = ChatMessage.getSpeaker({ actor: this });
    roll.toMessage({
      speaker: speaker,
      flavor: `우선권 굴림`
    });

    return roll.total;
  }

  /**
   * 기능 판정 굴림
   */
  async rollSkill(attribute, skillKey, skillName) {
    const bonus = this._getSkillBonus(attribute, skillKey);
    const attrValue = this.system.attributes[attribute]?.value || 0;
    
    const roll = new Roll("1d20 + @bonus + @attr", { 
      bonus: bonus,
      attr: attrValue
    });
    await roll.evaluate();
    
    const speaker = ChatMessage.getSpeaker({ actor: this });
    roll.toMessage({
      speaker: speaker,
      flavor: `${skillName} 판정 (난이도와 비교)`
    });

    return roll.total;
  }

  /**
   * 이성 판정 굴림
   */
  async rollSanity() {
    const currentSanity = this.system.stats.sanity.value;
    const roll = new Roll("1d20");
    await roll.evaluate();
    
    const success = roll.total <= currentSanity;
    const speaker = ChatMessage.getSpeaker({ actor: this });
    
    roll.toMessage({
      speaker: speaker,
      flavor: `이성 판정 (${roll.total} vs ${currentSanity}) - ${success ? '성공' : '실패'}`
    });

    return { success, roll: roll.total };
  }

  /**
   * 속성 판정 굴림
   */
  async rollAttribute(attributeKey, attributeName) {
    const attrValue = this.system.attributes[attributeKey]?.value || 0;
    
    const roll = new Roll("1d20 + @attr", { attr: attrValue });
    await roll.evaluate();
    
    const speaker = ChatMessage.getSpeaker({ actor: this });
    roll.toMessage({
      speaker: speaker,
      flavor: `${attributeName} 판정 (난이도와 비교)`
    });

    return roll.total;
  }
}
