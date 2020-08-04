<template>
  <div>
    <q-uploader
      url="http://localhost:8000/upload/"
      method="POST"
      field-name="files"
    />
    <q-uploader extensions=".gif,.jpg,.jpeg,.png" :factory="factoryFn" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected_file: "",
      check_if_document_upload: false
    };
  },
  methods: {
    factoryFn(files) {
      console.log(files);
      return {
        // url: 'http://localhost:8000/upload',
        url: () => `http://localhost:8000/files/`,
        method: "POST",
        // headers: () => [{name: 'Content-Type', value: 'multipart/form-data'}],
        fieldName: "files"
      };
    }
  }
};
</script>
