/**
 * Lord of Mysteries System for Foundry VTT
 * Lord of Mysteries TRPG 시스템 - 서열 기반 판정 시스템
 */

// Import document classes
import { LordOfMysteriesActor } from "./documents/actor.mjs";
import { LordOfMysteriesItem } from "./documents/item.mjs";

// Import sheet classes
import { LordOfMysteriesActorSheet } from "./sheets/actor-sheet.mjs";
import { LordOfMysteriesItemSheet } from "./sheets/item-sheet.mjs";

// Import helper classes
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { registerHandlebarsHelpers } from "./helpers/handlebars.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {
  console.log('Lord of Mysteries | 시스템 초기화 중...');

  // Add custom constants
  game.lordofmysteries = {
    LordOfMysteriesActor,
    LordOfMysteriesItem
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = LordOfMysteriesActor;
  CONFIG.Item.documentClass = LordOfMysteriesItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("lord-of-mysteries", LordOfMysteriesActorSheet, {
    makeDefault: true,
    label: "LOM.SheetClassCharacter"
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("lord-of-mysteries", LordOfMysteriesItemSheet, {
    makeDefault: true,
    label: "LOM.SheetClassItem"
  });

  // Register Handlebars helpers
  registerHandlebarsHelpers();

  // Preload Handlebars templates
  await preloadHandlebarsTemplates();

  console.log('Lord of Mysteries | 시스템 초기화 완료');
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', async function() {
  console.log('Lord of Mysteries | 시스템 준비 완료');
});

/* -------------------------------------------- */
/*  Dice Rolling Hooks                          */
/* -------------------------------------------- */

Hooks.on('renderChatMessage', (message, html, data) => {
  // 채팅 메시지 커스터마이징
});
