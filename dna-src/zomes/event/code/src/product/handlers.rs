
use hdk::error::ZomeApiResult;
use hdk::holochain_core_types::{
    entry::Entry,
    cas::content::Address,
    json::RawString,
};

use crate::product::{
    Product,
};

pub fn handle_create_product(
    name: String,
    description: String, 
    image_url: String,
    price: u32
) -> ZomeApiResult<Address> {

    let product = Product{name, description, image_url, price};

    let entry = Entry::App(
        "product".into(),
        product.into()
    );

    let product_address = hdk::commit_entry(&entry)?;

    let anchor_entry = Entry::App(
        "anchor".into(),
        RawString::from("global_product_list").into(),
    );

    let anchor_address = hdk::commit_entry(&anchor_entry)?;
    hdk::link_entries(&anchor_address, &product_address, "global_product_list")?;

    Ok(product_address)
}
