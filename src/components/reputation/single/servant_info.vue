<template>
  <div class="m-servant-wrap">
    <div class="servant-content">
      <div class="servant-image">
        <img :src="info.image" />
        <div class="buff-info">
          <p>知交祝福：【 {{info.szBuffName}} 】</p>
          <p>{{info.szBuffDesc}}</p>
        </div>
      </div>
      <div class="servant-list">
        <div class="servant-item">
          <p class="u-subtitle">【获取条件】</p>
          <p class="servant-desc">{{info.level}}</p>
        </div>
        <div class="servant-item">
          <p class="u-subtitle">【知交名字】</p>
          <p class="servant-desc">{{info.szNpcName}}</p>
        </div>
        <div class="servant-item">
          <p class="u-subtitle">【知交简介】</p>
          <p class="servant-desc">{{info.szDescBrief}}</p>
        </div>
        <div class="servant-item">
          <p class="u-subtitle">【知交故事】</p>
          <p class="servant-desc">{{info.szDescPersonality}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServantInfo',
  props: ['info']
}
</script>

<style lang="less">
.servant-content {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    font-size: 13px;
    .servant-image {
        width: 200px;
        margin-right: 10px;
        text-align: center;
        image {
            max-width: 152px;
        }
        .buff-info {
            p {
                margin-top: 5px;
            }
        }
    }

    .servant-desc {
        text-indent: 1em;
        line-height: 1.8;
    }
    .servant-list {
        width: calc(100% - 210px);
    }
}
@media screen and (max-width: 768px) {
    .servant-content {
        flex-direction: column;
        align-items: center;
        .servant-list {
            margin-top: 20px;
            width: 100%;
        }
    }
}
</style>
