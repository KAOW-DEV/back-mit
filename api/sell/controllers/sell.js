const updateQuantityProduct = require("../../../config/functions/updateQuantityProduct");

// เรียกใช้ฟังชันก์
// itemMaterial = await updateQuantityProduct.addQuantity(item.id);
("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async insertSell(ctx) {
    let item = ctx.request.body.itemSell;
    // console.log("item", item);

    let res = await strapi
      .query("sell")
      .create({
        branch: item.branch,
        code: item.code,
        date: item.date,
        credit_term: item.credit_term,
        date_due: item.date_due,
        users_permissions_user: item.users_permissions_user,
        customer: item.customer,
        customer_code: item.customer_code,
        customer_name: item.customer_name,
        customer_address: item.customer_address,
        customer_phone: item.customer_phone,
        customer_fax: item.customer_fax,
        customer_description: item.customer_description,
        vat_type: item.vat_type,
        customer_price_level: item.customer_price_level,
        reduce_money: item.reduce_money,
        price_sum: item.price_sum,
        price_vat: item.price_vat,
        price_net: item.price_net,
      })
      .then(async (respone) => {
        return respone;
      })
      .catch((err) => {
        console.log("err", err);
      });

    return res;
  },

  async updateSell(ctx) {
    let item = ctx.request.body.itemSell;
    // console.log("item", item);

    let res = await strapi
      .query("sell")
      .update(
        { id: item.id },
        {
          branch: item.branch,
          code: item.code,
          date: item.date,
          credit_term: item.credit_term,
          date_due: item.date_due,
          users_permissions_user: item.users_permissions_user,
          customer: item.customer,
          customer_code: item.customer_code,
          customer_name: item.customer_name,
          customer_address: item.customer_address,
          customer_phone: item.customer_phone,
          customer_fax: item.customer_fax,
          customer_description: item.customer_description,
          vat_type: item.vat_type,
          customer_price_level: item.customer_price_level,
          reduce_money: item.reduce_money,
          price_sum: item.price_sum,
          price_vat: item.price_vat,
          price_net: item.price_net,
        }
      )
      .then(async (respone) => {
        return respone;
      })
      .catch((err) => {
        console.log("err", err);
      });

    return res;
  },

  async deleteSell(ctx) {},

  async filter(ctx) {
    let res = [];
    let item = ctx.request.body.itemFilter;
    console.log("item", item);

    res = await strapi
      .query("sell")
      .find(item)
      .then(async (respone) => {
        return respone;
      })
      .catch((err) => {
        console.log("err", err);
      });

    return res;
  },
};
