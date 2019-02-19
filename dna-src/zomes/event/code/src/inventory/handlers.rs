
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    entry::Entry,
    cas::content::Address,
    json::RawString,
};

use crate::inventory::{
    Inventory,
};

use crate::utils;

pub fn handle_create_inventory(
    product_address: Address,
    org_address: Address,
    stocked_units: u32
) -> ZomeApiResult<Address> {

    let inventory = Inventory{product_address, org_address, stocked_units};

    let entry = Entry::App(
        "inventory".into(),
        inventory.into()
    );

    let inventory_address = hdk::commit_entry(&entry)?;

    let anchor_entry = Entry::App(
        "anchor".into(),
        RawString::from("all_inventory_list").into(),
    );

    let anchor_address = hdk::commit_entry(&anchor_entry)?;
    hdk::link_entries(&anchor_address, &inventory_address, "inventory_link")?;

    Ok(inventory_address)
}


pub fn handle_get_all_inventory() -> ZomeApiResult<utils::GetLinksLoadResult<Inventory>> {
    let anchor_entry = Entry::App(
        "anchor".into(),
        RawString::from("all_inventory_list").into(),
    );
    let anchor_address = hdk::entry_address(&anchor_entry)?;

    utils::get_links_and_load_type(&anchor_address, "inventory_link")
}
