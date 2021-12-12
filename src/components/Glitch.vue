<template>
<span v-text="text"  :data-text="text" class="glitch"></span>
</template>

<script>

export default{
  props:{
    text: String
  }
}
</script>


<style lang="css">
:root {
  --main-bg-color: #000;
  --main-txt-color: #F4E9E1;
}

@keyframes glitch-1 {
  0% {
    clip: rect(25px, 600px, 4px, 0);
  }
  5.88235% {
    clip: rect(22px, 600px, 12px, 0);
  }
  11.76471% {
    clip: rect(44px, 600px, 20px, 0);
  }
  17.64706% {
    clip: rect(7px, 600px, 29px, 0);
  }
  23.52941% {
    clip: rect(13px, 600px, 18px, 0);
  }
  29.41176% {
    clip: rect(21px, 600px, 31px, 0);
  }
  35.29412% {
    clip: rect(17px, 600px, 20px, 0);
  }
  41.17647% {
    clip: rect(41px, 600px, 7px, 0);
  }
  47.05882% {
    clip: rect(43px, 600px, 2px, 0);
  }
  52.94118% {
    clip: rect(44px, 600px, 12px, 0);
  }
  58.82353% {
    clip: rect(44px, 600px, 22px, 0);
  }
  64.70588% {
    clip: rect(10px, 600px, 17px, 0);
  }
  70.58824% {
    clip: rect(31px, 600px, 13px, 0);
  }
  76.47059% {
    clip: rect(40px, 600px, 22px, 0);
  }
  82.35294% {
    clip: rect(16px, 600px, 30px, 0);
  }
  88.23529% {
    clip: rect(33px, 600px, 34px, 0);
  }
  94.11765% {
    clip: rect(9px, 600px, 40px, 0);
  }
  to {
    clip: rect(45px, 600px, 21px, 0);
  }
}

@-webkit-keyframes glitch-1 {
  0% {
    clip: rect(25px, 600px, 4px, 0);
  }
  5.88235% {
    clip: rect(22px, 600px, 12px, 0);
  }
  11.76471% {
    clip: rect(44px, 600px, 20px, 0);
  }
  17.64706% {
    clip: rect(7px, 600px, 29px, 0);
  }
  23.52941% {
    clip: rect(13px, 600px, 18px, 0);
  }
  29.41176% {
    clip: rect(21px, 600px, 31px, 0);
  }
  35.29412% {
    clip: rect(17px, 600px, 20px, 0);
  }
  41.17647% {
    clip: rect(41px, 600px, 7px, 0);
  }
  47.05882% {
    clip: rect(43px, 600px, 2px, 0);
  }
  52.94118% {
    clip: rect(44px, 600px, 12px, 0);
  }
  58.82353% {
    clip: rect(44px, 600px, 22px, 0);
  }
  64.70588% {
    clip: rect(10px, 600px, 17px, 0);
  }
  70.58824% {
    clip: rect(31px, 600px, 13px, 0);
  }
  76.47059% {
    clip: rect(40px, 600px, 22px, 0);
  }
  82.35294% {
    clip: rect(16px, 600px, 30px, 0);
  }
  88.23529% {
    clip: rect(33px, 600px, 34px, 0);
  }
  94.11765% {
    clip: rect(9px, 600px, 40px, 0);
  }
  to {
    clip: rect(45px, 600px, 21px, 0);
  }
}

@-webkit-keyframes glitch-2 {
  0% {
    clip: rect(8px, 600px, 50px, 0);
  }
  5.88235% {
    clip: rect(40px, 600px, 41px, 0);
  }
  11.76471% {
    clip: rect(33px, 600px, 16px, 0);
  }
  17.64706% {
    clip: rect(41px, 600px, 9px, 0);
  }
  23.52941% {
    clip: rect(14px, 600px, 30px, 0);
  }
  29.41176% {
    clip: rect(22px, 600px, 33px, 0);
  }
  35.29412% {
    clip: rect(37px, 600px, 48px, 0);
  }
  41.17647% {
    clip: rect(25px, 600px, 37px, 0);
  }
  47.05882% {
    clip: rect(1px, 600px, 18px, 0);
  }
  52.94118% {
    clip: rect(19px, 600px, 27px, 0);
  }
  58.82353% {
    clip: rect(33px, 600px, 29px, 0);
  }
  64.70588% {
    clip: rect(2px, 600px, 38px, 0);
  }
  70.58824% {
    clip: rect(18px, 600px, 41px, 0);
  }
  76.47059% {
    clip: rect(19px, 600px, 45px, 0);
  }
  82.35294% {
    clip: rect(44px, 600px, 32px, 0);
  }
  88.23529% {
    clip: rect(13px, 600px, 43px, 0);
  }
  94.11765% {
    clip: rect(4px, 600px, 6px, 0);
  }
  to {
    clip: rect(30px, 600px, 25px, 0);
  }
}
.glitch {
  position: relative;
}
.glitch::before, .glitch::after {
  position: absolute;
  content: attr(data-text);
  clip: rect(0, 0, 0, 0);
  width: 100%;
}
.glitch::before {
  animation: glitch-2 3s 500 linear alternate-reverse;
  text-shadow: 1px 1px #FBE601, 2px 0 #EB3406;
  top: 7pt;
  left: 1pt;
}
.glitch::after {
  animation: glitch-1 2s 500 linear alternate-reverse;
  top: 7pt;
  left: 1pt;
  text-shadow: -1px 1px #63C3EA, -2px 0 #2B30D1;
}
/*Copyright (c) 2021 by marinda (https://codepen.io/mariiinda/pen/vYNqoNm)*/
</style>