const updateQuantityProduct = require("../../../config/functions/updateQuantityProduct");

// เรียกใช้ฟังชันก์
// itemMaterial = await updateQuantityProduct.addQuantity(item.id);
("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async insertReceived(ctx) {
    let item = ctx.request.body.itemReceived;
    let itemsList = ctx.request.body.itemsReceivedList;

    // console.log("item", item);
    // console.log("itemsList", itemsList);

    let res = await strapi
      .query("received")
      .create({
        supplier: item.supplier,
        branch: item.branch,
        supplier_name: item.supplier.supplier_name,
        supplier_address: item.supplier.supplier_address,
        supplier_phone: item.supplier.supplier_phone,
        supplier_description: item.supplier.supplier_description,
        type_vat: item.type_vat,
        received_number: item.received_number,
        received_date: item.received_date,
        delivery_number: item.delivery_number,
        delivery_date: item.delivery_date,
        po_number: item.po_number,
        received_credit_term: item.received_credit_term,
        users_permissions_user: item.users_permissions_user,
        quantity_total: item.quantity_total,
        reduce_percen_1: item.reduce_percen_1,
        reduce_percen_2: item.reduce_percen_2,
        reduce_percen_3: item.reduce_percen_3,
        reduce_percen_4: item.reduce_percen_4,
        reduce_percen_5: item.reduce_percen_5,
        reduce_percen_sum: item.reduce_percen_sum,
        reduce_money: item.reduce_money,
        price_sum_no_vat: item.price_sum_no_vat,
        price_vat: item.price_vat,
        price_sum_net: item.price_sum_net,
      })
      .then(async (respone) => {
        // console.log("respone", respone);
        await insertReceivedList(respone, itemsList);

        return respone;
      })
      .catch((err) => {
        console.log("err", err);
      });

    // insertReceivedList
    async function insertReceivedList(respone, itemsList) {
      console.log("id", respone.id);
      console.log("itemsList", itemsList);

      for (const item of itemsList) {
        await strapi
          .query("received-list")
          .create({
            received: respone.id,
            product: item.product_unit.product,
            product_unit: item.product_unit,
            product_internal_code: item.product_internal_code,
            product_barcode: item.product_barcode,
            product_name: item.product_name,
            unit: item.unit,
            product_cost_vat: item.product_cost_vat,
            product_cost_no_vat: item.product_cost_no_vat,
            price: item.price,
            reduct_percen_1: item.reduct_percen_1,
            reduct_percen_2: item.reduct_percen_2,
            reduct_percen_3: item.reduct_percen_3,
            reduct_percen_4: item.reduct_percen_4,
            reduct_percen_5: item.reduct_percen_5,
            reduct_price_1: item.reduct_price_1,
            reduct_price_2: item.reduct_price_2,
            reduct_price_3: item.reduct_price_3,
            reduct_price_4: item.reduct_price_4,
            reduct_price_5: item.reduct_price_5,
            reduct_percen_sum: item.reduct_percen_sum,
            reduct_price_sum: item.reduct_price_sum,
            price_reduce: item.price_reduce,
            price_after_reduce: item.price_after_reduce,
            quantity: item.quantity,
            price_sum: item.price_sum,
          })
          .then(async (respone) => {
            // console.log("respone", respone);

            // เรียกใช้ฟังชันก์เพิ่มจำนวนสินค้า
            await updateQuantityProduct.addQuantity(
              item.product_unit.product.id,
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

  async updateReceived(ctx) {
    let item = ctx.request.body.itemReceived;
    let itemsList = ctx.request.body.itemsReceivedList;

    // console.log("item", item);
    // console.log("itemsList", itemsList);

    let res = await strapi
      .query("received")
      .update(
        {
          id: item.id,
        },
        {
          supplier: item.supplier,
          branch: item.branch,
          supplier_name: item.supplier.supplier_name,
          supplier_address: item.supplier.supplier_address,
          supplier_phone: item.supplier.supplier_phone,
          supplier_description: item.supplier.supplier_description,
          type_vat: item.type_vat,
          received_number: item.received_number,
          received_date: item.received_date,
          delivery_number: item.delivery_number,
          delivery_date: item.delivery_date,
          po_number: item.po_number,
          received_credit_term: item.received_credit_term,
          users_permissions_user: item.users_permissions_user,
          quantity_total: item.quantity_total,
          reduce_percen_1: item.reduce_percen_1,
          reduce_percen_2: item.reduce_percen_2,
          reduce_percen_3: item.reduce_percen_3,
          reduce_percen_4: item.reduce_percen_4,
          reduce_percen_5: item.reduce_percen_5,
          reduce_percen_sum: item.reduce_percen_sum,
          reduce_money: item.reduce_money,
          price_sum_no_vat: item.price_sum_no_vat,
          price_vat: item.price_vat,
          price_sum_net: item.price_sum_net,
        }
      )
      .then(async (respone) => {
        // console.log("respone", respone);

        await deleteReceivedList(respone);
        await insertReceivedList(respone, itemsList);

        return respone;
      })
      .catch((err) => {
        console.log("err", err);
      });

    // deleteReceivedList
    async function deleteReceivedList(respone) {
      await strapi
        .query("received-list")
        .find({
          received: respone.id,
        })
        .then(async (res) => {
          console.log("res", res);

          for (const item of res) {
            // เรียกใช้ฟังชันก์เพิ่มจำนวนสินค้า
            await updateQuantityProduct.deleteQuantity(
              item.product_unit.product,
              item.product_unit.product_unit_quantity_number,
              item.quantity
            );

            await strapi.query("received-list").delete({
              id: item.id,
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    // insertReceivedList
    async function insertReceivedList(respone, itemsList) {
      // console.log("id", respone.id);
      // console.log("itemsList", itemsList);

      for (const item of itemsList) {
        await strapi
          .query("received-list")
          .create({
            received: respone.id,
            product: item.product_unit.product,
            product_unit: item.product_unit,
            product_internal_code: item.product_internal_code,
            product_barcode: item.product_barcode,
            product_name: item.product_name,
            unit: item.unit,
            product_cost_vat: item.product_cost_vat,
            product_cost_no_vat: item.product_cost_no_vat,
            price: item.price,
            reduct_percen_1: item.reduct_percen_1,
            reduct_percen_2: item.reduct_percen_2,
            reduct_percen_3: item.reduct_percen_3,
            reduct_percen_4: item.reduct_percen_4,
            reduct_percen_5: item.reduct_percen_5,
            reduct_price_1: item.reduct_price_1,
            reduct_price_2: item.reduct_price_2,
            reduct_price_3: item.reduct_price_3,
            reduct_price_4: item.reduct_price_4,
            reduct_price_5: item.reduct_price_5,
            reduct_percen_sum: item.reduct_percen_sum,
            reduct_price_sum: item.reduct_price_sum,
            price_reduce: item.price_reduce,
            price_after_reduce: item.price_after_reduce,
            quantity: item.quantity,
            price_sum: item.price_sum,
          })
          .then(async (respone) => {
            console.log("respone", respone);

            // เรียกใช้ฟังชันก์เพิ่มจำนวนสินค้า
            await updateQuantityProduct.addQuantity(
              respone.product_unit.product,
              respone.product_unit.product_unit_quantity_number,
              respone.quantity
            );
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }

    return res;
  },

  async deleteReceived(ctx) {
    let item = ctx.request.body.itemReceived;
    console.log("item", item);

    let res = await strapi
      .query("received")
      .findOne({
        id: item.id,
      })
      .then(async (res) => {
        console.log("res"), res;
        await getItemsReceivedList(res);
      })
      .catch((err) => {
        console.log("err"), err;
      });

    async function getItemsReceivedList(res) {
      await strapi
        .query("received-list")
        .find({
          received: res.id,
        })
        .then(async (res) => {
          console.log("res"), res;
          await deleteItemsReceivedList(res);
          await deleteItemsReceived();
        })
        .catch((err) => {
          console.log("err"), err;
        });
    }

    async function deleteItemsReceivedList(items) {
      for (const item of items) {
        // เรียกใช้ฟังชันก์เพิ่มจำนวนสินค้า
        await updateQuantityProduct.deleteQuantity(
          item.product_unit.product,
          item.product_unit.product_unit_quantity_number,
          item.quantity
        );

        await strapi.query("received-list").delete({
          id: item.id,
        });
      }
    }

    async function deleteItemsReceived() {
      await strapi.query("received").delete({
        id: item.id,
      });
    }

    return true;
  },
};
