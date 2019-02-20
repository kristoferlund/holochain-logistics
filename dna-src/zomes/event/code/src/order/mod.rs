
use hdk::entry_definition::ValidatingEntryType;
use hdk::holochain_core_types::{
    json::JsonString,
    error::HolochainError,
    dna::entry_types::Sharing,
    cas::content::Address,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Order {
    pub supply_organisation: Address,
    pub recieving_organisation: Address,
    pub product_address: Address,
    pub order_quantity: u32,
    pub transport: String,
    pub comment: String,
    pub is_sent: bool,
    pub is_recieved: bool
}



pub fn order_definition() -> ValidatingEntryType {
    entry!(
        name: "order",
        description: "The base data for an order",
        sharing: Sharing::Public,
        native_type: Order,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_order: Order, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}