
use hdk::entry_definition::ValidatingEntryType;
use hdk::holochain_core_types::{
    json::JsonString,
    error::HolochainError,
    dna::entry_types::Sharing,
    cas::content::Address,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Inventory {
    pub product_address: Address,
    pub org_address: Address,
    pub stocked_units: u32,
}

pub fn inventory_definition() -> ValidatingEntryType {
    entry!(
        name: "inventory",
        description: "The inventory quantity of a product at an org",
        sharing: Sharing::Public,
        native_type: Inventory,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_inventory: Inventory, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}