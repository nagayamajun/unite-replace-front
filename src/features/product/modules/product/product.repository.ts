import {
  Product,
  ProductWithApprovedUserRecruitParticipants,
} from "../../types/product";
import { axiosInstance } from "@/libs/axios";
import {
  FAIL_TO_CREATE_PRODUCT,
  FAIL_TO_GET_PRODUCT,
  FAIL_TO_UPDATE_PRODUCT,
  SUCCESS_TO_CREATE_PRODUCT,
} from "@/constants/constants";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { ToastResult } from "@/types/toast";

export type submitProductDate = {
  recruitId: string;
  name: string;
  skills: ProgrammingSkill[];
  reasonForSkillSelection: string;
  developmentBackground: string;
  overview: string;
  file: any;
};

export const productRepository = {
  //全ての募集を取得する
  async getAllProducts() {
    const allProducts = (
      await axiosInstance.get("/product").catch((error) => {
        throw new Error(FAIL_TO_GET_PRODUCT);
      })
    ).data;
    return allProducts;
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

  //プロダクトの一件取得 (関連する応募の確定参加者も取得してくる) (企業認証を使う)
  async getProductWithApprovedUserRecruitParticipantsById(
    id: string
  ): Promise<ProductWithApprovedUserRecruitParticipants> {
    const product: ProductWithApprovedUserRecruitParticipants = (
      await axiosInstance
        .get(`/product/findOne/with-approved-recruit-participant/${id}`)
        .catch((error) => {
          if (error instanceof Error) {
            throw new Error(`${FAIL_TO_GET_PRODUCT}\n${error.message}`);
          }
          throw error;
        })
    ).data;

    return product;
  },

  //プロダクト作成
  async createProduct(
    data: submitProductDate
  ): Promise<ToastResult> {
    try {
      await axiosInstance.post("/product/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { style: 'success', message: SUCCESS_TO_CREATE_PRODUCT }
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_CREATE_PRODUCT}\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  },

  //productの編集
  async editProductInfo(id: string, data: any) {
    const product = (
      await axiosInstance.put(`/product/${id}`, data).catch((err) => {
        throw new Error(FAIL_TO_UPDATE_PRODUCT);
      })
    ).data;

    return product;
  },
};
