/**
 * 행동 시트 - 별도 창
 */
export class LordOfMysteriesActionsSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["lord-of-mysteries", "sheet", "actor", "actions-sheet"],
      template: "systems/lord-of-mysteries/templates/actor/actor-actions-sheet.hbs",
      width: 700,
      height: 600,
      tabs: []
    });
  }

  /** @override */
  async getData() {
    const context = super.getData();
    
    const actorData = this.actor.toObject(false);
    context.system = actorData.system;
    context.flags = actorData.flags;

    // 행동 타입 선택지
    context.actionTypes = {
      'attack': '공격',
      'cast': '시전',
      'move': '이동',
      'swift': '신속',
      'free': '자유'
    };

    // 행동 아이템만 필터링
    context.actions = actorData.items.filter(i => i.type === 'action');

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    if (!this.isEditable) return;

    // 행동 생성
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // 행동 편집
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".action-item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    // 행동 삭제
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".action-item");
      const item = this.actor.items.get(li.data("itemId"));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // 행동 사용
    html.find('.item-roll').click(ev => {
      const li = $(ev.currentTarget).parents(".action-item");
      const item = this.actor.items.get(li.data("itemId"));
      if (item) item.roll();
    });
  }

  /**
   * 아이템 생성 처리
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const itemType = element.dataset.type;
    
    const itemData = {
      name: `새로운 행동`,
      type: itemType,
      system: {}
    };

    return await Item.create(itemData, {parent: this.actor});
  }
}
