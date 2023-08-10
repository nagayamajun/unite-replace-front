import Link from "next/link";
import React, {  useState } from "react";
import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { useRouter } from "next/router";
import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import { AiFillDelete } from 'react-icons/ai'
import { useRecruit } from "../../hooks/useRecruit";
import { SelectedSkillsList } from "@/components/molecules/SkillList/SelectedSkillsList";


export const OwnRecruitDetail: React.FC = ()  => {
  const router = useRouter();
  const { recruit } = useRecruit();
  
  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  if (recruit === undefined) return <Loading />

  const approveApplication = async(uid: string) => {
    await userRecruitParticipantRepository.approveParticipant(uid)
    .then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message)
        setColor(result.success)

        setTimeout(() => {
          router.reload()
        },
        result.success ? 2000 : 4000
        )
      }
    });
  }

  const rejectApplication = async(uid: string) => {
    await userRecruitParticipantRepository.rejectParticipant(uid)
    .then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message)
        setColor(result.success)

        setTimeout(() => {
          router.reload()
        },
        result.success ? 2000 : 4000
        )
      }
    });
  }

  const deleteRecruit = async() => {
    await recruitRepository.deleteRecruit(recruit.id).then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message)
        setColor(result.success)

        setTimeout(() => {
          router.push('/homeScreen')
        }, 
        result.success ? 2000 : 4000
        )
      }
    })
    
  }

  return (
    <div className="h-full w-full flex justify-center items-center bg-white">
      <div className="flex flex-col items-center w-4/5 sm:w-sm md:w-md lg:w-lg bg-white rounded-md">
      <div className="h-24 sm:h-40 w-full flex flex-col justify-center items-center bg-gradient-to-r from-green-300 to-pink-300 text-white rounded-md gap-y-4">
          {/* ハッカソン名 */}
          <p className="text-3xl sm:text-4xl font-bold text-center">{recruit?.hackthonName}</p>
          <p className="text-xl text-center">- {recruit?.headline} -</p>
        </div>

        <div className="w-full flex flex-col gap-y-10">
          {/* プログラミングスキル */}
          <div className="border border-gray-300 p-2 mx-2 mt-10 rounded-lg">
            <SelectedSkillsList
              selectedSkillsDescription="募集スキル"
              selectedSkills={recruit?.programingSkills}
              descriptionFontSize="text-base font-semibold"
              skillIconHSize={40}
              skillIconWSize={40}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between border border-gray-300 rounded-lg px-2 py-4 mx-2">
            <div className="mb-2 w-full ">
              <p className="font-semibold">開発期間</p>
              <div>{recruit?.developmentPeriod}</div>
            </div>
            <div className="w-full">
              <p className="font-semibold">募集人数</p>
              <div><span className="p-1 rounded-md font-semibold">{recruit?.numberOfApplicants}</span> 人</div>
            </div>
          </div>

          {/* 募集の詳細 */}
          <div className="m-2">
            <p className="font-semibold mb-2">詳細</p>
            <div className="leading-snug border border-gray-300 rounded-lg p-3" style={{ overflowWrap: 'break-word' }}>{recruit?.details}</div>
          </div>

          <div className="m-2">
            <p className="font-semibold mb-2">ハッカソンURL</p>
            <div className="leading-snug border border-gray-300 rounded-lg p-3" style={{ overflowWrap: 'break-word' }}>{recruit?.hackathonUrl}</div>
          </div>
          {/* <div className="flex flex-col w-full"> */}
          <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
            <p className="font-semibold mb-2">参加者</p>
            {recruit.userRecruitParticipant?.length === 0 && <p>参加者はまだいません</p>}
            {recruit.userRecruitParticipant?.map((participant: UserRecruitParticipant, index) => {
              if (participant.isApproved) {
                return (
                  <div key={index}>
                    {/* userの写真追加する */}
                    <p>{participant.user.name}</p>
                  </div>
                )
              }
            })}
          </div>

          <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
            <p className="font-semibold mb-2">参加希望者一覧</p>
            {/* ここは応募してくれた方を一覧表示する */}
            {recruit.userRecruitParticipant?.length === 0 && <p>希望者はまだいません</p>}
            {recruit.userRecruitParticipant?.map((participant: UserRecruitParticipant, index) => {
              if (!participant.isApproved) {
                return (
                  <div key={index} className="flex flex-row justify-between">
                    <p>{participant.user?.name}</p>
                    <div>
                      <button onClick={() => {approveApplication(participant.id)}} className="mr-2 hover:text-green-400">承認</button>
                      <button onClick={() => {rejectApplication(participant.id)}} className="hover:text-red-400">拒否</button>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>

        <div className="flex items-center justify-center w-full my-10">
          {
            recruit?.product.length !== 0 ? (
              <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row w-1/2">
                  <Link href={`/recruit/editRecruit?id=${recruit.id}`} className="bg-green-400 hover:bg-green-500 px-4 py-4 rounded-md text-white">募集情報を編集する</Link>
                  {/* 削除ボタン */}
                  <button onClick={deleteRecruit} className="ml-5 text-gray-400">
                    <AiFillDelete size={25} />
                  </button>
                </div>
                <Link href={`/product/${recruit.product[0]?.id}`} className="bg-green-400 hover:bg-green-500 px-6 py-4 rounded-md text-white">Productページへ</Link>
              </div>
            ) : (
              <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row w-1/2">
                  <Link href={`/recruit/editRecruit?id=${recruit.id}`} className="bg-green-400 hover:bg-green-500 p-2 rounded-md text-white  text-xs sm:text-base">募集情報を編集する</Link>
                  {/* 削除ボタン */}
                  <button onClick={deleteRecruit} className="ml-5 text-gray-400">
                    <AiFillDelete size={20} />
                  </button>
                </div>
                <Link href={`/product/uploadProduct?recruitId=${recruit?.id}`} className="bg-green-400 hover:bg-green-500 p-2 rounded-md text-white ">UPLOADする</Link>
              </div>
            )
          }
        </div>
      </div>

      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </div>
  )
}

 //リファクタ
 //募集人数を動的に変更 -> 承認したら募集人数を一人減らす