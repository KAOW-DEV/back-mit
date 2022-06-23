const updateQuantityProduct = require("../../../config/functions/updateQuantityProduct");

// เรียกใช้ฟังชันก์
// itemMaterial = await updateQuantityProduct.addQuantity(item.id);
("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async insertSellList(ctx) {
    let itemSell = ctx.request.body.itemSell;
    let items = ctx.request.body.itemsSellList;
    let res = [];
    // console.log("item", item);

    for (const item of items) {
      await strapi
        .query("sell-list")
        .create({
          sell: itemSell.id,
          product: item.product,
          product_unit: item.product_unit,
          product_internal_code: item.product_internal_code,
          product_barcode: item.product_barcode,
          product_name: item.product_name,
          product_unit_name: item.product_unit_name,
          quantity: item.quantity,
          price: item.price,
          percen_reduce: item.percen_reduce,
          percen_reduce_money: item.percen_reduce_money,
          money_reduce: item.money_reduce,
          percen_plus: item.percen_plus,
          percen_plus_money: item.percen_plus_money,
          money_plus: item.money_plus,
          price_net: item.price_net,
          price_sum: item.price_sum,
          full_price: item.full_price,
          discount_percen: item.discount_percen,
          base_on: item.base_on,
          adjus_table: item.adjus_table,
          limit_accept: item.limit_accept,
          customer_price_level: item.customer_price_level,
        })
        .then(async (respone) => {
          res.push(respone);
          // เรียกใช้ฟังชันก์เพิ่มจำนวนสินค้า
          await updateQuantityProduct.deleteQuantity(
            item.product.id,
            item.product_unit.product_unit_quantity_number,
            item.quantity
          );
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    return res;
  },

  async updateSellList(ctx) {
    let itemSell = ctx.request.body.itemSell;
    let items = ctx.request.body.itemsSellList;
    let res = [];
    let itemsOld = [];
    // console.log("item", item);

    //findItemsOld
    itemsOld = await strapi
      .query("sell-list")
      .find({
        sell: itemSell.id,
      })
      .then(async (respone) => {
        console.log("respone", respone);
        return respone;
      })
      .catch((err) => {
        console.log("err", err);
      });

    //   process
    if (itemsOld.length > 0) {
      await restore();
      await deleteItemsOld();
      await insertItemsNews();
    }

    // restore
    async function restore() {
      for (const item of itemsOld) {
        // เรียกใช้ฟังชันก์เพิ่มจำนวนสินค้า
        await updateQuantityProduct.addQuantity(
          item.product.id,
          item.product_unit.product_unit_quantity_number,
          item.quantity
        );
      }
    }

    // deleteItemsOld
    async function deleteItemsOld() {
      for (const item of itemsOld) {
        await strapi
          .query("sell-list")
          .delete({
            id: item.id,
          })
          .then(async (respone) => {
            // console.log("respone", respone);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }

    //insertItemsNews
    async function insertItemsNews() {
      for (const item of items) {
        await strapi
          .query("sell-list")
          .create({
            sell: itemSell.id,
            product: item.product,
            product_unit: item.product_unit,
            product_internal_code: item.product_internal_code,
            product_barcode: item.product_barcode,
            product_name: item.product_name,
            product_unit_name: item.product_unit_name,
            quantity: item.quantity,
            price: item.price,
            percen_reduce: item.percen_reduce,
            percen_reduce_money: item.percen_reduce_money,
            money_reduce: item.money_reduce,
            percen_plus: item.percen_plus,
            percen_plus_money: item.percen_plus_money,
            money_plus: item.money_plus,
            price_net: item.price_net,
            price_sum: item.price_sum,
            full_price: item.full_price,
            discount_percen: item.discount_percen,
            base_on: item.base_on,
            adjus_table: item.adjus_table,
            limit_accept: item.limit_accept,
            customer_price_level: item.customer_price_level,
          })
          .then(async (respone) => {
            res.push(respone);
            // เรียกใช้ฟังชันก์เพิ่มจำนวนสินค้า
            await updateQuantityProduct.deleteQuantity(
              item.product.id,
              item.product_unit.product_unit_quantity_number,
              item.quantity
            );
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }

    return res;
  },
};
