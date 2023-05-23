import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useProgramingSkills } from "@/hooks/useProgramingSkills";
import { Option } from "../../types/recruitCard";
import Image from "next/image";

import { recruitCard } from "../../types/recruitCard";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { serverTimestamp } from "firebase/firestore";
import { ProgramingSkill } from "@/types/programingSkill";
import { ProgramingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  user: any;
};

export const CreateRecruitModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  user,
}): JSX.Element => {
  const { handleSubmit, register, control } = useForm();
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);

  const onSubmit = (data: any) => {

    let recruit_data: recruitCard = {
      headline: data.headline,
      recruitment_details: data.recruitment_details,
      programing_skills: selectedSkills,
      timestamp: serverTimestamp(),
      user_id: user,
    };
    recruitRepository.createRecuit(recruit_data);
    location.reload()
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[40%] h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="group relative mb-2 block overflow-hidden rounded-3xl bg-white lg:mb-3 overflow-y-auto">
                    <div className="flex justify-center object-cover object-center">
                      <Image
                        src="/avatar.gif"
                        alt=""
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="flex justify-center object-cover object-center">
                      {/* formを作成する */}
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-[90%]"
                      >
                        <input
                          {...register("headline", {
                            required: "必須入力です",
                          })}
                          placeholder="一言タイトルをご入力ください"
                          className="w-full rounded-2xl bg-gray-50 my-10 px-5 py-3 text-gray-900 placeholder-opacity-75 outline-none ring-indigo-300 transition duration-100 ease-in-out"
                        />
                        <Controller
                          name="programingSkills"
                          control={control}
                          render={({ field }) => (
                            <Select
                              isMulti
                              options={ProgramingSkillOptions}
                              onChange={(selectedSkills) => {
                                setSelectedSkills(selectedSkills as Option[]);
                                field.onChange(
                                  selectedSkills.map((skill) => skill.value)
                                );
                              }}
                              placeholder="スキル名を選択してください (複数選択可)"
                              styles={{
                                control: (styles) => ({
                                  ...styles,
                                  marginBottom: "1rem",
                                  color: "black",
                                  backgroundColor: "rgba(234, 234, 234, 0.5)",
                                  opacity: 0.5,
                                  borderRadius: "0.5rem",
                                  boxShadow: "none",
                                  border: "1px solid #e2e8f0",
                                }),
                                option: (styles, { isFocused }) => ({
                                  ...styles,
                                  backgroundColor: isFocused
                                    ? "#e2e8f0"
                                    : "white",
                                  color: "black",
                                  "&:active": {
                                    backgroundColor: "#e2e8f0",
                                  },
                                }),
                                multiValue: (styles) => ({
                                  ...styles,
                                  backgroundColor: "#e2e8f0",
                                }),
                                multiValueLabel: (styles) => ({
                                  ...styles,
                                  color: "black",
                                }),
                                multiValueRemove: (styles) => ({
                                  ...styles,
                                  color: "black",
                                  ":hover": {
                                    backgroundColor: "black",
                                    color: "white",
                                  },
                                }),
                              }}
                            />
                          )}
                        />
                        <div className="flex flex-wrap gap-3 min-w-full">
                          {selectedSkills.map((selectedSkill) => (
                            <div
                              key={selectedSkill.label}
                              className="px-3 py-1 rounded-3xl bg-background-color text-base mt-3"
                            >
                              {selectedSkill.value ?? " "}
                            </div>
                          ))}
                        </div>

                        <textarea
                          {...register("recruitment_details", {
                            required: "必須入力です",
                          })}
                          placeholder="詳細な情報を自由にご入力ください"
                          rows={5}
                          className="w-full rounded-2xl bg-gray-50 my-5 px-5 py-3 text-gray-900 placeholder-opacity-75 outline-none ring-indigo-300 transition duration-100 ease-in-out"
                        />

                        <div className="flex justify-end items-center py-3 ">
                          <button type="submit">
                            <Image
                              src="/plus.gif"
                              alt=""
                              width={75}
                              height={75}
                            />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

//リファクタ
//skillInputをコンポーネント化
