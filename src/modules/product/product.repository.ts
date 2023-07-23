import { Product } from "../../types/product";
import { axiosInstance } from "@/libs/axios";
import { FAIL_TO_CREATE_PRODUCT, FAIL_TO_GET_PRODUCT, FAIL_TO_UPDATE_PRODUCT, SUCCESS_TO_CREATE_PRODUCT } from "@/constants/constants";

export type submitProductDate = {
  recruitId: string;
  headline: string;
  detail: string;
  file: any;
};

export const productRepository = {
  //全ての募集を取得する
  async getAllProducts() {
    const allProducts = ( await axiosInstance.get("/product").catch((error) => {
      throw new Error(FAIL_TO_GET_PRODUCT)
    })).data
    return allProducts
  },

  //自分の作成したproduct全件取得
  async getMyProducts() {
    const myProducts = (
      await axiosInstance.get("/product/my-products").catch((err) => {
        throw new Error(FAIL_TO_GET_PRODUCT);
      })
    ).data;
    return myProducts;
  },

  //自分に関連するProductを全件取得
  async getRelatedProduct() {
    const relatedProducts = (
      await axiosInstance.get("/product/find-related-products").catch((err) => {
        throw new Error(FAIL_TO_GET_PRODUCT);
      })
    ).data;

    return relatedProducts;
  },

  //プロダクトの一件取得
  async getProductById(id: string): Promise<Product> {
    const product: Product = (
      await axiosInstance.get(`/product/findOne/${id}`).catch((err) => {
        throw new Error(FAIL_TO_GET_PRODUCT);
      })
    ).data;

    return product;
  },

  //企業認証を使ってproductを取得する。
  async getProductByCorporateId(id: string) {
    const product: Product = (
      await axiosInstance.get(`/product/findOne/corporation/${id}`).catch(() => {
        throw new Error(FAIL_TO_GET_PRODUCT)
      })
    ).data

    return product
  },

  //上位10のproductを取得
  async getTopTenProducts() {
    const likeSum = (
      await axiosInstance.get(`/period-like-sum`).catch(() => {
        throw Error(FAIL_TO_GET_PRODUCT)
      })
    ).data
    const products: Product[] = likeSum.map((res: any) => res.product)

    return products
  },

  //プロダクト作成
  async createProduct(
    data: submitProductDate
  ): Promise<{ success: boolean; message: string } | undefined> {
    try {
      await axiosInstance.post("/product/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return { success: true, message: SUCCESS_TO_CREATE_PRODUCT };
    } catch (error) {
      return {
        success: false,
        message: FAIL_TO_CREATE_PRODUCT,
      };
    }
  },

  //productの情報取得
  async editProductInfo(id: string, data: any) {
    const product = (
      await axiosInstance.put(`/product/${id}`, data).catch((err) => {
        throw new Error(FAIL_TO_UPDATE_PRODUCT);
      })
    ).data;

    return product;
  },
};
