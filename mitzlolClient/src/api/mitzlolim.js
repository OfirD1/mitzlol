import axios from "axios";

export default {
  getMitzlolim: function(word, onSuccess, onError) {
    word = word.trim();
    if (word) {
      axios({
        url: "/api/words/" + word,
        method: "GET"
      }).then(
        function (response) {
          onSuccess(response);
        },
        function (response) {
          if (onError) {
            onError(response);
          }
          /* eslint-disable no-console */
          console.log(response);
          /* eslint-enable no-console */
        }
      );
    } else {
      onSuccess({ data: [] });
    }
  }
};
