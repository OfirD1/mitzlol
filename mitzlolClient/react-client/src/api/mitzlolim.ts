import axios from "axios";

export default {
  getMitzlolim: function (
    word: string,
    onSuccess: Function,
    onError: Function
  ) {
    word = word.trim();
    if (word) {
      axios({
        url: "/api/words/" + word,
        method: "GET",
      }).then(
        function (response) {
          onSuccess(response.data);
        },
        function (response) {
          if (onError) {
            onError(response);
          }
        }
      );
    } else {
      onSuccess({ data: [] });
    }
  },
};
