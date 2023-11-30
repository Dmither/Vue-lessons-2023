import { ref, watchEffect, toValue } from "vue";

export function useFetch(url) {
	const data = ref(null);
	const error = ref(null);

  function fetchData() {
    fetch(toValue(url))
      .then(res => res.json())
      .then(json => (data.value = json))
      .catch(err => (error.value = err));
  }

  watchEffect(() => {
    data.value = null;
    error.value = null;
    fetchData();
  })

	return { data, error };
}
