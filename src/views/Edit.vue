<template>
  <div>
    <label>
      <img src="@/assets/add_a_photo.svg" class="add-photo" />
      <input type="file" class="add-file" @change="onFileChange" />
    </label>
    <div class="page">
      <div class="icon">
        <div class="icon-content">
          <div class="icon-content-crop">
            <UserIcon :icon="cropImage" />
          </div>
        </div>
      </div>
      <div class="page-contents" v-if="singerState">
        <EditForm
          :formData="singerFormData"
          @change-value="changeSingerValue"
        />
      </div>
      <div class="page-contents" v-else>
        <EditForm :formData="mixerFormData" @change-value="changeMixerValue" />
      </div>
      <div class="done-back-button">
        <WhiteButtonsSet :data="whiteButtonsData" @click-event="clickButton" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EditForm, { IformData } from "@/components/organisms/EditForm.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";
import WhiteButtonsSet, {
  ButtonsSetType as IButtonsData,
} from "@/components/molecules/WhiteButtonsSet.vue";
import UserIcon from "@/components/atoms/UserIcon.vue";

import {
  DEFAULT_SINGER_DATA,
  DEFAULT_MIXER_DATA,
  IsingerData,
  ImixerData,
} from "@/mixins/defaultProfileData";

type DataType = {
  uploadedImage: string;
  targetWidth: number;
  targetHeight: number;
  filename: string;
  mixerFormData: IformData[];
  singerFormData: IformData[];
  whiteButtonsData: IButtonsData[];
};

export default defineComponent({
  name: "Edit",
  beforeRouteLeave(to, form, next) {
    (this as any).$store.dispatch("trimming/closeTrimming");
    //コンポーネントから遷移する前にトリミングエリアを閉じる
    next();
  },
  components: {
    EditForm,
    CommonButton,
    WhiteButtonsSet,
    UserIcon,
  },
  data(): DataType {
    return {
      uploadedImage: "",
      targetWidth: 1,
      targetHeight: 1,
      filename: "",
      singerFormData: [
        //歌い手編集画面のデータ
        {
          id: 1,
          label: "名前",
          value: "",
          formType: "TextField",
        },
        {
          id: 2,
          label: "自己紹介",
          value: "",
          formType: "TextArea",
        },
        {
          id: 3,
          label: "Twitter",
          value: "",
          formType: "TextField",
        },
        {
          id: 4,
          label: "投稿先リンク",
          value: "",
          formType: "TextArea",
        },
      ],
      mixerFormData: [
        //ミックス師編集画面のデータ
        {
          id: 1,
          label: "名前",
          value: "",
          formType: "TextField",
        },
        {
          id: 2,
          label: "自己紹介",
          value: "",
          formType: "TextArea",
        },
        {
          id: 3,
          label: "Twitter",
          value: "",
          formType: "TextField",
        },
        {
          id: 4,
          label: "料金",
          value: "",
          formType: "TextArea",
        },
        {
          id: 5,
          label: "納期",
          value: "",
          formType: "TextArea",
        },
      ],
      whiteButtonsData: [
        {
          label: "完了",
          id: 0,
        },
        {
          label: "キャンセル",
          id: 1,
        },
      ],
    };
  },
  created() {
    this.setFormDataValue(); //初期はvuexの情報を表示
    (this as any).$store.dispatch("trimming/closeTrimming");
  }, //トリミングエリアを閉じる

  computed: {
    singerState(): boolean {
      //歌い手としてログインしているならtrue
      return (this as any).$store.state.auth.singerState;
    },
    cropImage(): string {
      return (this as any).$store.state.trimming.cropImage;
    },
  },
  methods: {
    onFileChange(e: any) {
      const files = e.target.files || e.dataTransfer.files;
      (this as any).$store.dispatch("trimming/openTrimming"); //トリミングエリアの表示
      this.createImage(files[0]);
    },
    //アップロードした画像を表示
    createImage(file: any) {
      const reader = new FileReader();
      reader.onload = (e) => {
        //データの読み込みが正常に完了した時に発火
        (this as any).uploadedImage = e.target!.result; //画像データそのもの
        (this as any).$store.dispatch(
          "trimming/updateImage",
          this.uploadedImage
        );
      };
      reader.readAsDataURL(file); //fileの内容を読み込み
    },
    setFormDataValue(): void {
      //formDataにvuexのプロフィール情報を入れる
      const selfProfile = (this as any).$store.state.exchange.selfProfileData; //ユーザー自身のプロフィール情報
      if (this.singerState) {
        const defaultData: IsingerData = DEFAULT_SINGER_DATA; //歌い手のデータのキー取得用
        for (let i in this.singerFormData) {
          const keyName: string = Object.keys(defaultData)[i];
          this.singerFormData[i].value = selfProfile[keyName];
        }
      } else {
        const defaultData: ImixerData = DEFAULT_MIXER_DATA; //Mix師のデータのキー取得用
        for (let i in this.mixerFormData) {
          const keyName: string = Object.keys(defaultData)[i];
          this.mixerFormData[i].value = selfProfile[keyName];
        }
      }
    },
    changeSingerValue(value: string, key: number): void {
      this.singerFormData[key - 1].value = value;
    },
    changeMixerValue(value: string, key: number): void {
      this.mixerFormData[key - 1].value = value;
    },
    clickButton(id: number): void {
      //idで処理分岐
      if (id === 0) {
        const editFormData: IformData[] = this.singerState
          ? this.singerFormData
          : this.mixerFormData; //編集データを職業で分岐
        if (this.singerState) {
          if (
            editFormData[0].value == "" ||
            editFormData[1].value == "" ||
            editFormData[2].value == "" ||
            editFormData[3].value == ""
          ) {
            alert("全ての事項を記入してください。");
          } else {
            (this as any).$store.dispatch(
              "exchange/updateProfile",
              editFormData
            );
            (this as any).$store.dispatch(
              "trimming/updateCropImage",
              (this as any).$store.state.trimming.cropImage
            );
          }
        } else {
          if (
            editFormData[0].value == "" ||
            editFormData[1].value == "" ||
            editFormData[2].value == "" ||
            editFormData[3].value == "" ||
            editFormData[4].value == ""
          ) {
            alert("全ての事項を記入してください。");
          } else {
            (this as any).$store.dispatch(
              "exchange/updateProfile",
              editFormData
            );
            (this as any).$store.dispatch(
              "trimming/updateCropImage",
              (this as any).$store.state.trimming.cropImage
            );
          }
        }
      } else {
        this.setFormDataValue(); //フォームのデータをvuexの情報に戻す
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.add-photo {
  z-index: 1;
  margin: 135px 0px 0px 53px;
  position: absolute;
}
.add-file {
  z-index: 0;
  padding: 140px 0px 0px 65px;
  position: absolute;
}

.page {
  display: grid;
  background-color: $-primary-300;
  grid-template-columns: (120px 1fr 120px);
  grid-column-gap: 24px;
  grid-auto-columns: 100px;
  padding: 16px;
  overflow-y: scroll;
}

.icon {
  justify-content: center; /* アイテムを中央に寄せる */
  align-items: center; /* アイテムを中央付近にまとめる */
  &-content {
    margin: 0px 20px 20px 0px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: silver;
    position: sticky;
    top: 0;
  }
}

.done-back-button {
  height: 200px;
  padding: 0px 60px 0px 0px;
  position: sticky;
  top: 0;
}

.icon-content-crop {
  height: 120px;
  height: 120px;
  border-radius: 50%;
}

label {
  width: 100%;
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  background-color: $-primary-100;
  border: 2px solid;
  color: $-primary-800;
  border-color: $-primary-800;
  outline: none;
  cursor: pointer;
  padding: 10px 8px 10px 8px;
  &:hover {
    background-color: $-primary-700;
    color: $-primary-100;
  }
}

input[type="file"] {
  display: none;
}
</style>