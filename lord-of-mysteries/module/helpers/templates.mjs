/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 */
export async function preloadHandlebarsTemplates() {
  return loadTemplates([
    // Actor partials
    "systems/lord-of-mysteries/templates/actor/parts/actor-attributes.hbs",
    "systems/lord-of-mysteries/templates/actor/parts/actor-stats.hbs",
    "systems/lord-of-mysteries/templates/actor/parts/actor-skills.hbs",
    "systems/lord-of-mysteries/templates/actor/parts/actor-items.hbs",
    "systems/lord-of-mysteries/templates/actor/parts/actor-actions.hbs",
    
    // Item partials
    "systems/lord-of-mysteries/templates/item/parts/item-header.hbs",
    "systems/lord-of-mysteries/templates/item/parts/item-description.hbs"
  ]);
}
