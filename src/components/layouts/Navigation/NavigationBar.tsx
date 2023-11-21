import { AiOutlineUnorderedList, AiOutlineWechat, AiFillLike } from 'react-icons/ai';
import { LinkWithIcon } from '@/components/Link/LinkWithIcon';
import { PiUserListBold } from 'react-icons/pi'

export const NavigationBar = () => {

  const menus = [
    {label: "募集一覧", link: '/homeScreen', icon: <AiOutlineUnorderedList />},
    {label: "チャット", link: '/homeScreen', icon: <AiOutlineWechat />},
    {label: "いいね", link: '/recruit/likedRecruitList', icon: <AiFillLike/>},
    {label: "作成・参加", link: '/homeScreen', icon: <PiUserListBold/>},
    {label: "関連募集", link: '/recruit/ownAndRelated', icon: <AiOutlineUnorderedList/>},
    // 今後追加していく
  ]

  return (
    <section className='flex justify-center mt-8 '>
      <div className='flex w-base justify-between'>
        {menus.map((menu) => (
          <div key={menu.label} className='w-32'>
            <LinkWithIcon
              labelText={menu.label}
              icon={menu.icon}
              link={menu.link}
              bgColor='bg-white'
              textColor='text-black'
              isBorder={true}
            />
          </div>
        ))}
      </div>
    </section>
  )
}