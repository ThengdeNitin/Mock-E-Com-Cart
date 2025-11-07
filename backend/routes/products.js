const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      const seed = [
        {
          name: "Apple iPhone 17 Pro (Cosmic Orange, 1 TB)",
          price: 174900,
          description: `Dynamic Island, Always On Display, ProMotion Technology with Adaptive Refresh Rates Upto 120Hz, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, Contrast Ratio: 2,000,000:1 (Typical), 1,000 nits Max Brightness (Typical), 1,600 nits Peak Brightness (HDR), 2,000 nits Peak Brightness (Outdoor), Fingerprint Resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously`,
          image: "/uploads/iphone_17_pro.jpg",
        },
        {
          name: "SONY ILCE-6100X Mirrorless Camera Body with with SELP16502 & SEL55210  (Black)",
          price: 73990,
          description: `AC Adaptor: AC-UUE12 Eyepiece cup Lens cap Lens hood Lens rear cap Micro USB cable Power cord Rechargeable Battery NP-FW50 SEL55210 SELP16502 Shoulder strap`,
          image: "/uploads/sony-original.jpg",
        },
        {
          name: "ADIDAS TIRO COM Football - Size: 4  (Standard, Pack of 1, White)",
          price: 2759,
          description: `Brand: ADIDAS,Model Name: TIRO COM, Type: Football,Size: 4,Diameter: 20,Color: White,Weight Range: 360-390,Net Quantity: 1`,
          image: "/uploads/football-adidas-original.jpg",
        },
        {
          name: "BMW MMS Drift Cat 8 Sneakers For Men  (White , 9)",
          price: 3989,
          description: "Brand new Puma Shoes",
          image: "/uploads/puma_bmw_edition.jpg",
        },
        {
          name: "The Art of Being Alone - the art of being alone book  (English, Paperback, Gavrani Renuka)",
          price: 141,
          description: `The Art of Being Alone" explores the concept of solitude as a source of strength and self-discovery. The book encourages readers to embrace their alone time, highlighting its potential for personal growth, creativity, and deeper self-understanding. It delves into various aspects of solitude, such as the benefits of reflection, the importance of self-care, and the distinction between being alone and feeling lonely. Through a blend of personal anecdotes, philosophical insights, and practical advice, the author invites readers to redefine their relationship with solitude and find peace and fulfillment in their own company.`,
          image: "/uploads/the-art-of-being-alone.jpg",
        },
        {
          name: "Men Solid Sports Jacket",
          price: 1310,
          description: `Very nice jacket, all those who are looking for a thin jacket , without sweat and heat ,keeps cool all the time. This is the right one.`,
          image: "/uploads/adidas-jacket.jpg",
        }
      ];

      await Product.insertMany(seed);
      console.log("Seed products inserted with images");
    }

    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
