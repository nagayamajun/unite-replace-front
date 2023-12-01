import { AiOutlineUnorderedList, AiOutlineWechat, AiFillLike } from 'react-icons/ai';
import { LinkWithIcon } from '@/components/Link/LinkWithIcon';
import { ChatRoomListMenu } from '@/ui/chat/shared-components/ChatRoomListMenu';

export const NavigationBar = () => {

  const menus = [
    {label: "募集一覧", link: '/homeScreen', icon: <AiOutlineUnorderedList />},
    {label: "いいね", link: '/recruit/likedRecruitList', icon: <AiFillLike/>},
    // {label: "作成・参加", link: '/homeScreen', icon: <PiUserListBold/>},
    {label: "関連募集", link: '/recruit/ownAndRelated', icon: <AiOutlineUnorderedList/>},
  ]

  return (
    <section className='flex justify-center mt-8 '>
      <div className='flex w-base space-x-5'>
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
        <ChatRoomListMenu>
          <div className="flex items-center w-32 space-x-2 py-2 rounded-md justify-center border border-gray-300">
            <AiOutlineWechat />
            <p className="text-sm font-light">チャット</p>
          </div>
      </ChatRoomListMenu>
      </div>
    </section>
  )
}