<!--
 * @description
!-->
<template>
  <div>
    <div class="sword">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
  .sword {
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 50%;

    span {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    :first-child {
      left: 0%;
      top: 0%;
      border-bottom: 15px solid #fff;
      animation: sword-one 1s linear infinite;
    }

    :nth-child(2) {
      right: 0%;
      top: 0%;
      animation: sword-two 1s linear infinite;
      border-right: 15px solid #fff;
    }

    :last-child {
      right: 0%;
      bottom: 0%;
      animation: sword-three 1s linear infinite;
      border-top: 15px solid #fff;
    }
  }

  @keyframes sword-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }

    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes sword-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }

    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes sword-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }

    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
</style>
