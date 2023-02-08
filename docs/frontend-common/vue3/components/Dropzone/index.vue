<!--
 * @description
!-->
<template>
  <div>
    <div :id="id" ref="dropzoneElement" :class="{ 'vue-dropzone dropzone': includeStyling }">
      <div v-if="useCustomSlot" class="dz-message">
        <slot>将文件拖到此处以上载</slot>
      </div>
    </div>
    <div :id="id + 'PreviewTemplate'" class="previewTemplate">
      <div class="dz-preview dz-file-preview">
        <div class="dz-image"><img data-dz-thumbnail /></div>
        <div class="dz-details">
          <div class="dz-size"><span data-dz-size></span></div>
          <div class="dz-filename"><span data-dz-name></span></div>
        </div>
        <div class="dz-progress">
          <span class="dz-upload" data-dz-uploadprogress></span>
        </div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="dz-success-mark">
          <svg width="54" height="54" viewBox="0 0 54 54" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z"
            />
          </svg>
        </div>
        <div class="dz-error-mark">
          <svg width="54" height="54" viewBox="0 0 54 54" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z"
            />
          </svg>
        </div>
        <div v-if="extraButton" class="dz-remove dz-extra-button">{{ extraButton }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, computed, ref, onBeforeUnmount } from 'vue'
  import 'dropzone/dist/dropzone.css'
  import Dropzone, { DropzoneOptions } from 'dropzone'
  import { CustomDropzoneFile } from './types/typings'
  import { uploadFile as uploadFileForCOS, removeFile as removeFileForCOS } from '../../../utils/cos'
  import { FileType } from '../../../utils/types/typings/cos'

  const props = withDefaults(
    defineProps<{
      // 唯一标识
      id: string
      // 配置信息请见：https://docs.dropzone.dev/configuration/basics/configuration-options
      options: DropzoneOptions
      // 是否使用默认样式
      includeStyling?: boolean
      // 销毁组件时是否销毁 dropzone 对象。
      destroyDropzone?: boolean
      // 在 dropzone 中已删除的文件中检查添加的文件是否重复
      duplicateCheck?: boolean
      // 使用在默认消息区域使用自定义槽
      useCustomSlot?: boolean
      // 是否使用一个额外的按钮
      extraButton?: string
      // 是否使用 cos 上传
      cos?: boolean
    }>(),
    {
      includeStyling: true,
      destroyDropzone: true,
      duplicateCheck: false,
      useCustomSlot: false,
      cos: true,
    }
  )
  const emits = defineEmits([
    'vdropzone-extra-button',
    'vdropzone-thumbnail',
    'vdropzone-duplicate-file',
    'vdropzone-file-added',
    'vdropzone-files-added',
    'vdropzone-removed-file',
    'vdropzone-success',
    'vdropzone-success-multiple',
    'vdropzone-error',
    'vdropzone-error-multiple',
    'vdropzone-sending',
    'vdropzone-sending-multiple',
    'vdropzone-complete',
    'vdropzone-complete-multiple',
    'vdropzone-canceled',
    'vdropzone-canceled-multiple',
    'vdropzone-max-files-reached',
    'vdropzone-max-files-exceeded',
    'vdropzone-processing',
    'vdropzone-processing-multiple',
    'vdropzone-upload-progress',
    'vdropzone-total-upload-progress',
    'vdropzone-reset',
    'vdropzone-queue-complete',
    'vdropzone-drop',
    'vdropzone-drag-start',
    'vdropzone-drag-end',
    'vdropzone-drag-enter',
    'vdropzone-drag-over',
    'vdropzone-drag-leave',
    'vdropzone-mounted',
    'vdropzone-file-added-manually',
  ])

  let dropzone: Dropzone | null = null
  const dropzoneElement = ref<HTMLDivElement | null>(null)

  const dropzoneSettings = computed(() => {
    let defaultValues: DropzoneOptions = {
      previewTemplate: document.getElementById(props.id + 'PreviewTemplate').innerHTML,
      thumbnailWidth: 200,
      thumbnailHeight: 200,
      dictDefaultMessage: '将文件拖到此处以上载',
      dictFallbackMessage: '您的浏览器不支持拖放文件上载。',
      dictFallbackText: '请使用下面的回退表单，像以前一样上载文件。',
      // dictFileTooBig: '文件过大({{filesize}}MiB)，请使用{{maxFilesize}}MiB大小内的文件',
      dictFileTooBig: '文件过大，请使用{{maxFilesize}}MB大小内的文件',
      dictInvalidFileType: '无法上载此类型的文件。',
      dictResponseError: '服务器响应了{{statusCode}}码。',
      dictCancelUpload: '取消上传',
      dictUploadCanceled: '上传已取消。',
      dictCancelUploadConfirmation: '确认是否要取消此上载？',
      dictRemoveFile: '删除文件',
      dictMaxFilesExceeded: '您不能再上载任何文件。',
      url: 'Fill me',
      maxFilesize: 1,
      addRemoveLinks: true,
      filesizeBase: 1024
    }
    Object.keys(props.options).forEach(function (key) {
      defaultValues[key] = props.options[key]
    })
    if (props.cos) {
      defaultValues.autoProcessQueue = false
    }
    return defaultValues
  })

  onMounted(() => {
    if (dropzoneElement.value) {
      dropzone = new Dropzone(dropzoneElement.value, dropzoneSettings.value)
      dropzone.on('thumbnail', function (file, dataUrl) {
        emits('vdropzone-thumbnail', file, dataUrl)
      })
      dropzone.on('addedfile', function (file) {
        if (props.duplicateCheck) {
          if (this.files.length) {
            let _i, _len
            for (
              _i = 0, _len = this.files.length;
              _i < _len - 1;
              _i++ // -1 to exclude current file
            ) {
              if (
                this.files[_i].name === file.name &&
                this.files[_i].size === file.size &&
                this.files[_i].lastModified.toString() === file.lastModified.toString()
              ) {
                this.removeFile(file)
                emits('vdropzone-duplicate-file', file)
              }
            }
          }
        }
        const extraButtons = document.querySelectorAll('.dz-extra-button')
        for (const item of extraButtons) {
          item.addEventListener('click', () => {
            triggerExtraButton(file)
          })
        }
        emits('vdropzone-file-added', file)
      })

      dropzone.on('addedfiles', function (files: CustomDropzoneFile[]) {
        if (props.cos) {
          for (const file of files) {
            // 变更状态
            file.status = Dropzone.UPLOADING
            dropzone.emit('processing', file)
            // 开始上传
            uploadFileForCOS(file, getFileType(file), {
              progress: ({ loaded, total }) => {
                file.upload.progress = loaded / total
                file.upload.total = total
                file.upload.bytesSent = loaded
                dropzone.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent)
              },
            })
              .then((res) => {
                file.cos = res
                file.status = Dropzone.SUCCESS;
                dropzone.emit('success', file, null, null)
                dropzone.emit('complete', file)
              })
              .catch((err) => {
                file.status = Dropzone.ERROR;
                dropzone.emit('error', file, err, null)
                dropzone.emit('complete', file)
              })
          }
        }
        emits('vdropzone-files-added', files)
      })

      dropzone.on('removedfile', function (file: CustomDropzoneFile) {
        emits('vdropzone-removed-file', file)
        if (file.manuallyAdded && dropzone.options.maxFiles !== null) dropzone.options.maxFiles++
        if (props.cos) {
          if (file.status === Dropzone.SUCCESS) {
            if (file.cos) {
              removeFileForCOS(file.cos.fileName, getFileType(file))
            } else {
              console.error('No cos information')
            }
          }
        }
      })

      dropzone.on('success', function (file, response) {
        emits('vdropzone-success', file, response)
      })

      dropzone.on('successmultiple', function (files) {
        emits('vdropzone-success-multiple', files)
      })

      dropzone.on('error', function (file, message) {
        // 1s 后隐藏错误信息，防止挡住按钮
        const previewElement = file.previewElement
        const errorMessageElement = previewElement.querySelector('.dz-error-message') as HTMLDivElement | null
        previewElement.addEventListener('mouseenter', () => {
          if (errorMessageElement) {
            errorMessageElement.setAttribute('style', '')
            setTimeout(() => {
              if (errorMessageElement) {
                errorMessageElement.style.opacity = '0'
                errorMessageElement.style.pointerEvents = 'none'
              }
            }, 1000)
          }
        })
        previewElement.addEventListener('mouseleave', () => {
          if (errorMessageElement) {
            errorMessageElement.setAttribute('style', '')
          }
        })
        emits('vdropzone-error', file, message)
      })

      dropzone.on('errormultiple', function (files, message) {
        emits('vdropzone-error-multiple', files, message)
      })

      dropzone.on('sending', function (file, xhr, formData) {
        emits('vdropzone-sending', file, xhr, formData)
      })

      dropzone.on('sendingmultiple', function (file, xhr, formData) {
        emits('vdropzone-sending-multiple', file, xhr, formData)
      })

      dropzone.on('complete', function (file) {
        emits('vdropzone-complete', file)
      })

      dropzone.on('completemultiple', function (files) {
        emits('vdropzone-complete-multiple', files)
      })

      dropzone.on('canceled', function (file) {
        emits('vdropzone-canceled', file)
      })

      dropzone.on('canceledmultiple', function (files) {
        emits('vdropzone-canceled-multiple', files)
      })

      dropzone.on('maxfilesreached', function (files) {
        emits('vdropzone-max-files-reached', files)
      })

      dropzone.on('maxfilesexceeded', function (file) {
        emits('vdropzone-max-files-exceeded', file)
      })

      dropzone.on('processing', function (file) {
        emits('vdropzone-processing', file)
      })

      dropzone.on('processingmultiple', function (files) {
        emits('vdropzone-processing-multiple', files)
      })

      dropzone.on('uploadprogress', function (file, progress, bytesSent) {
        emits('vdropzone-upload-progress', file, progress, bytesSent)
      })

      dropzone.on('totaluploadprogress', function (totaluploadprogress, totalBytes, totalBytesSent) {
        emits('vdropzone-total-upload-progress', totaluploadprogress, totalBytes, totalBytesSent)
      })

      dropzone.on('reset', function () {
        emits('vdropzone-reset')
      })

      dropzone.on('queuecomplete', function () {
        emits('vdropzone-queue-complete')
      })

      dropzone.on('drop', function (event) {
        emits('vdropzone-drop', event)
      })

      dropzone.on('dragstart', function (event) {
        emits('vdropzone-drag-start', event)
      })

      dropzone.on('dragend', function (event) {
        emits('vdropzone-drag-end', event)
      })

      dropzone.on('dragenter', function (event) {
        emits('vdropzone-drag-enter', event)
      })

      dropzone.on('dragover', function (event) {
        emits('vdropzone-drag-over', event)
      })

      dropzone.on('dragleave', function (event) {
        emits('vdropzone-drag-leave', event)
      })

      emits('vdropzone-mounted')
    }
  })
  onBeforeUnmount(() => {
    if (props.destroyDropzone) {
      dropzone && dropzone.destroy()
    }
  })

  function getFileType(file: CustomDropzoneFile) {
    const IMG_TYPE_LIST = ['png', 'jpeg', 'jpg', 'webp', 'gif']
    const suffixName = file.name.slice(file.name.lastIndexOf('.') + 1).toLocaleLowerCase()
    let uploadType: FileType = 'img'
    if (IMG_TYPE_LIST.includes(suffixName)) {
      uploadType = 'img'
    } else {
      uploadType = 'vedio'
    }
    return uploadType
  }
  function triggerExtraButton(file: CustomDropzoneFile) {
    emits('vdropzone-extra-button', file)
  }
  function manuallyAddFile(file: CustomDropzoneFile, thumbnailUrl: string) {
    file.manuallyAdded = true
    let reader = new FileReader();
    file.accepted = true
    reader.readAsDataURL(file)
    reader.onload = function (evt) {
        let base64  = evt.target.result as string;
        file.dataURL = base64
    };
    dropzone.emit('addedfile', file)
    if (
      dropzone.options.createImageThumbnails &&
      thumbnailUrl &&
      file.size <= dropzone.options.maxThumbnailFilesize * 1024 * 1024
    ) {
      dropzone.emit('thumbnail', file, thumbnailUrl)

      const thumbnails = file.previewElement.querySelectorAll('[data-dz-thumbnail]') as NodeListOf<HTMLElement>
      for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].style.width = dropzoneSettings.value.thumbnailWidth + 'px'
        thumbnails[i].style.height = dropzoneSettings.value.thumbnailHeight + 'px'
        thumbnails[i].style['object-fit'] = 'contain'
      }
    }
    dropzone.emit('complete', file)
    if (dropzone.options.maxFiles) dropzone.options.maxFiles--
    dropzone.files.push(file)
    emits('vdropzone-file-added-manually', file)
  }
  function setOption(option: Dynamic, value: unknown) {
    dropzone.options[option] = value
  }
  function removeAllFiles(bool: boolean) {
    dropzone.removeAllFiles(bool)
  }
  function processQueue() {
    dropzone.processQueue()
    dropzone.on('success', function () {
      dropzone.options.autoProcessQueue = true
    })
    dropzone.on('queuecomplete', function () {
      dropzone.options.autoProcessQueue = false
    })
  }
  function disable() {
    return dropzone.disable()
  }
  function enable() {
    return dropzone.enable()
  }
  function removeFile(file: CustomDropzoneFile) {
    dropzone.removeFile(file)
  }
  function getAcceptedFiles() {
    return dropzone.getAcceptedFiles()
  }
  function getRejectedFiles() {
    return dropzone.getRejectedFiles()
  }
  function getQueuedFiles() {
    return dropzone.getQueuedFiles()
  }
  function getUploadingFiles() {
    return dropzone.getUploadingFiles()
  }
  function getDropzoneInstance() {
    return dropzone
  }

  defineExpose({
    removeAllFiles,
    setOption,
    manuallyAddFile,
    removeFile,
    processQueue,
    getAcceptedFiles,
    getRejectedFiles,
    getQueuedFiles,
    getUploadingFiles,
    disable,
    enable,
    getDropzoneInstance,
  })
</script>
<style scoped lang="scss">
  .previewTemplate {
    display: none;
  }
  :deep(.vue-dropzone) {
    border: 2px solid #e5e5e5;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.2px;
    color: #777;
    transition: 0.2s linear;
    &:hover {
      background-color: #f6f6f6;
    }
    > i {
      color: #ccc;
    }
    > .dz-preview {
      background-color: transparent;
      border-radius: 5px;
      overflow: hidden;
      .dz-image {
        border-radius: 0;
        width: 100%;
        height: 100%;
        img {
          &:not([src]) {
            width: 200px;
            height: 200px;
          }
        }
        &:hover {
          img {
            transform: none;
            filter: none;
            -webkit-filter: none;
          }
        }
      }
      .dz-details {
        bottom: 0;
        top: 0;
        color: white;
        background-color: transparent;
        transition: opacity 0.2s linear;
        text-align: left;
        .dz-filename {
          overflow: hidden;
          span {
            background-color: transparent;
          }
          &:not(:hover) {
            span {
              border: none;
            }
          }
          &:hover {
            span {
              background-color: transparent;
              border: none;
            }
          }
        }
        .dz-size {
          span {
            background-color: transparent;
          }
        }
      }
      .dz-progress {
        .dz-upload {
          background: #cccccc;
        }
      }
      .dz-remove {
        position: absolute;
        z-index: 30;
        color: white;
        margin-left: 15px;
        padding: 10px;
        top: inherit;
        bottom: 15px;
        border: 2px white solid;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 1.1px;
        opacity: 0;
      }
      &:hover {
        z-index: 10;
        .dz-remove {
          opacity: 1;
        }
      }
      .dz-success-mark {
        margin-left: auto;
        margin-top: auto;
        width: 100%;
        top: 35%;
        left: 0;
        background-color: transparent;
        svg {
          margin-left: auto;
          margin-right: auto;
        }
      }
      .dz-error-mark {
        margin-left: auto;
        margin-top: auto;
        width: 100%;
        top: 35%;
        left: 0;
        background-color: transparent;
        svg {
          margin-left: auto;
          margin-right: auto;
        }
      }
      .dz-error-message {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        width: 100%;
        text-align: center;
        &:after {
          display: none;
        }
      }

      .dz-remove {
        padding: 5px;
      }

      .dz-extra-button {
        bottom: 65px;
      }
    }
  }
</style>
