/**
 * Extend the basic Item document
 */
export class LordOfMysteriesItem extends Item {

  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
  }

  /** @override */
  prepareDerivedData() {
    const itemData = this;
    const systemData = itemData.system;
    const flags = itemData.flags.lordofmysteries || {};

    // Make modifications to data here based on item type
    if (itemData.type === 'action') {
      this._prepareActionData(itemData);
    }
  }

  /**
   * Prepare Action specific data
   */
  _prepareActionData(itemData) {
    // Actions 관련 데이터 준비
  }

  /**
   * Handle clickable rolls
   */
  async roll() {
    const item = this;
    
    // 액션 아이템이면 관련 판정 실행
    if (item.type === 'action') {
      const actor = this.actor;
      if (!actor) return;

      const systemData = item.system;
      let roll;
      let flavor = `${item.name} - ${this._getActionTypeLabel(systemData.actionType)}`;

      // 판정 타입에 따라 다른 굴림 실행
      if (systemData.checkType === 'skill') {
        // 기능 판정
        const [attribute, skillKey] = systemData.checkTarget.split('.');
        const bonus = actor._getSkillBonus(attribute, skillKey);
        const attrValue = actor.system.attributes[attribute]?.value || 0;
        
        roll = new Roll("1d20 + @bonus + @attr", { 
          bonus: bonus,
          attr: attrValue
        });
      } else if (systemData.checkType === 'attribute') {
        // 속성 판정
        const attrValue = actor.system.attributes[systemData.checkTarget]?.value || 0;
        roll = new Roll("1d20 + @attr", { attr: attrValue });
      }

      if (roll) {
        await roll.evaluate();
        
        const speaker = ChatMessage.getSpeaker({ actor: actor });
        roll.toMessage({
          speaker: speaker,
          flavor: flavor,
          flags: { "lordofmysteries.itemId": item.id }
        });
      }
    }

    // 아이템 설명을 채팅으로 출력
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    ChatMessage.create({
      speaker: speaker,
      content: `<div class="lord-of-mysteries-item">
        <h3>${item.name}</h3>
        <p>${item.system.description || ''}</p>
      </div>`
    });
  }

  /**
   * 행동 종류 라벨 반환
   */
  _getActionTypeLabel(actionType) {
    const labels = {
      'attack': '공격 행동',
      'cast': '시전 행동',
      'move': '이동 행동',
      'swift': '신속 행동',
      'free': '자유 행동'
    };
    return labels[actionType] || actionType;
  }
}
