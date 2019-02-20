
use hdk::error::ZomeApiResult;
use hdk::error::ZomeApiError;
use hdk::holochain_core_types::{
    entry::Entry,
    cas::content::Address,
    json::RawString,
    error::error::HolochainError,
};
use std::convert::TryFrom;

use crate::inventory::{
    Inventory,
};

use crate::utils;

pub fn handle_create_inventory(
    product_address: Address,
    org_address: Address,
    stocked_units: u32
) -> ZomeApiResult<Address> {

    let inventory = Inventory {product_address, org_address, stocked_units};

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

pub fn handle_update_inventory_qty(inventory_address: Address, new_stock_qty: u32) -> ZomeApiResult<Address> {

    let entry = hdk::get_entry(&inventory_address)?
       .ok_or(HolochainError::ErrorGeneric("Entry not found".to_string()))?;
    if let Entry::App(_, json_string) = entry {
       let old_inventory = Inventory::try_from(json_string)?;

       let product_address = old_inventory.product_address;
       let org_address = old_inventory.org_address;
       let stocked_units = new_stock_qty;

       let inventory_entry = Inventory{product_address, org_address, stocked_units};
       
       let updated_inventory_entry = Entry::App(
            "inventory".into(),
            inventory_entry.into(),
       );
        let updated_inventory_address = hdk::update_entry(updated_inventory_entry, &inventory_address)?;
        Ok(updated_inventory_address)
    } else {
        Err(ZomeApiError::Internal("failed to update inventory".into()))
    }
} 
