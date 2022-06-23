"use strict";

const { default: createStrapi } = require("strapi");
const { update } = require("strapi-connector-bookshelf/lib/relations");

module.exports = {
  async addQuantity(productId, quantityUnit, quantity) {
    // console.log("productId", productId);
    // console.log("quantityUnit", quantityUnit);
    // console.log("quantity", quantity);

    await strapi
      .query("product")
      .find({
        id: productId,
      })
      .then(async (res) => {
        console.log("addQuantity", res);
        let quantityUpdate = res[0].product_quantity + quantityUnit * quantity;
        await updateQuantity(res[0], quantityUpdate);
      })
      .catch((err) => {
        console.log("err", err);
      });

    async function updateQuantity(product, quantityUpdate) {
      await strapi.query("product").update(
        {
          id: product.id,
        },
        {
          product_quantity: quantityUpdate,
        }
      );
    }
  },

  async deleteQuantity(productId, quantityUnit, quantity) {
    // console.log("productId", productId);
    // console.log("quantityUnit", quantityUnit);
    // console.log("quantity", quantity);

    await strapi
      .query("product")
      .find({
        id: productId,
      })
      .then(async (res) => {
        console.log("res", res[0]);
        console.log("product_quantity", res[0].product_quantity);

        let quantityUpdate = res[0].product_quantity - quantityUnit * quantity;
        await updateQuantity(res[0], quantityUpdate);
      })
      .catch((err) => {
        console.log("err", err);
      });

    async function updateQuantity(product, quantityUpdate) {
      await strapi.query("product").update(
        {
          id: product.id,
        },
        {
          product_quantity: quantityUpdate,
        }
      );
    }
  },
};
