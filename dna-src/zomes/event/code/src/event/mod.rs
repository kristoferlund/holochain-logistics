use hdk::{
    self,
    entry_definition::ValidatingEntryType,
    holochain_core_types::error::HolochainError,
    holochain_core_types::json::JsonString,
};

use hdk::holochain_core_types::{
    dna::entry_types::Sharing,
    cas::content::Address,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Event {
    pub name: String,
    pub description: String
}


pub fn public_event_definition() -> ValidatingEntryType {
    entry!(
        name: "public_event",
        description: "A event of which anyone can become a member and post",
        sharing: Sharing::Public,
        native_type: Event,

        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },

        validation: |_event: Event, _ctx: hdk::ValidationData| {
            Ok(())
        },

        links: [
            to!(
                "%agent_id",
                tag: "has_member",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                tag: "member_of",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            ),
            to!(
                "message",
                tag: "message_in",

                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },

                validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                    Ok(())
                }
            )
        ]
    )
}
