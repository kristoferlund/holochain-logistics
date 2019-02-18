
use hdk::entry_definition::ValidatingEntryType;
use hdk::holochain_core_types::{
    json::JsonString,
    error::HolochainError,
    dna::entry_types::Sharing,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Product {
    pub name: String,
    pub description: String,
    pub image_url: String,
    pub price: u32,
}

pub fn product_definition() -> ValidatingEntryType {
    entry!(
        name: "product",
        description: "The base data for a product",
        sharing: Sharing::Public,
        native_type: Product,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_product: Product, _ctx: hdk::ValidationData| {
            Ok(())
        }
    )
}