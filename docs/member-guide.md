---
layout: page
---
<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/52433086?v=4',
    name: 'Chaoxin Wu',
    title: '小厨师👩🏻‍🍳',
    links: [
      { icon: 'github', link: 'https://github.com/wuchaoxin' },
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