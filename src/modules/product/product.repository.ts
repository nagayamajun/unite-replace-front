import axios from "axios";
import { Product } from "../../types/product";
import { axiosInstance } from "@/libs/axios";

export type submitProductDate = {
  recruitId: string;
  headline: string;
  detail: string;
  file: any;
};

export const ProductRepositry = {
  //自分の作成したproduct全件取得
  async getMyProducts() {
    const myProducts = (
      await axiosInstance.get("/product/my-products").catch((err) => {
        throw new Error(`自分で作成したproductの取得に失敗しました。${err}`);
      })
    ).data;
    return myProducts;
  },

  //プロダクト作成
  async createProduct(
    data: submitProductDate
  ): Promise<{ success: boolean; message: string } | undefined> {
    try {
      await axiosInstance.post("/product/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return { success: true, message: "productを作成しました。" };
    } catch (error) {
      return {
        success: false,
        message: "productの作成に失敗しました。再度やり直してください。",
      };
    }
  },

  //プロダクトの一件取得
  async getProductById(id: string): Promise<Product> {
    const product: Product = (
      await axiosInstance.get(`/product/findone/${id}`).catch((err) => {
        throw new Error(`プロダクトの取得に失敗しました`);
      })
    ).data;

    return product;
  },

  //自分に関連するProductを全件取得
  async getRelatedProduct() {
    const relatedProducts = (
      await axiosInstance.get("/product/find-related-products").catch((err) => {
        throw new Error(`関連するproductsの取得に失敗しました。| ${err}`);
      })
    ).data;

    return relatedProducts;
  },

  //productの情報取得
  async editProductInfo(id: string, data: any) {
    const product = (
      await axiosInstance.put(`/product/${id}`, data).catch((err) => {
        throw new Error("プロダクトの情報の編集に失敗しました。");
      })
    ).data;

    return product;
  },
};
