---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://gitlab.healthych.com/uploads/-/system/user/avatar/35/avatar.png',
    name: 'Yongji Zhu',
    title: '老司机',
    links: [
      { icon: 'github', link: 'https://gitlab.healthych.com/zhu' },
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_3_3864104420_1659677483_26.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659162043&t=153c82cfefb4806c3a48185d57447a08',
    name: 'Li Deng',
    title: '邓丽',
    links: [
      { icon: 'github', link: 'https://gitlab.healthych.com/dengli' },
    ]
  },
  {
    avatar: 'https://gitlab.healthych.com/uploads/-/system/user/avatar/56/avatar.png',
    name: 'Yang Yang',
    title: '杨扬🐑',
    links: [
      { icon: 'github', link: 'https://gitlab.healthych.com/young' },
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_3_3864104420_1659677483_26.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659162043&t=153c82cfefb4806c3a48185d57447a08',
    name: 'Wei Huang',
    title: '王芮🐰',
    links: [
      { icon: 'github', link: 'https://gitlab.healthych.com/wangrui' },
    ]
  },
  {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_3_3864104420_1659677483_26.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659162043&t=153c82cfefb4806c3a48185d57447a08',
    name: 'Rui Wang',
    title: '维维豆奶',
    links: [
      { icon: 'github', link: 'https://gitlab.healthych.com/huangwei' },
    ]
  },
  {
    avatar: 'https://gitlab.healthych.com/uploads/-/system/user/avatar/80/avatar.png',
    name: 'Chaoxin Wu',
    title: '吴朝鑫',
    links: [
      { icon: 'github', link: 'https://gitlab.healthych.com/wuchaoxin' },
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      团队成员
    </template>
    <template #lead>
      前端组团队成员
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>