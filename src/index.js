import "./styles.css";

const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteList(inputText);
};

const deleteFromIncompleteList = (deleteTarget) => {
  document.getElementById("incomplete-list").removeChild(deleteTarget);
};

const createIncompleteList = (text) => {
  const div = document.createElement("div");
  div.className = "list-row";

  const li = document.createElement("li");
  li.innerText = text;

  div.appendChild(li);

  const doneButton = document.createElement("button");
  doneButton.innerText = "完了";
  doneButton.addEventListener("click", () => {
    // 未完了から削除する
    deleteFromIncompleteList(doneButton.parentNode);
    // 削除対象のテキストを保持する
    const addTarget = doneButton.parentNode;
    const text = addTarget.firstElementChild.innerText;
    // 削除対象のテキストを初期化する
    addTarget.textContent = null;
    // 完了リストに追加するため要素を生成
    const li = document.createElement("li");
    // 削除対象の保持したテキストを代入する
    li.innerText = text;
    // 戻すボタンを生成する
    const backBotton = document.createElement("button");
    backBotton.innerText = "戻す";
    backBotton.addEventListener("click", () => {
      const deleteTarget = backBotton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);
      const text = backBotton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });
    // divタグの子要素に各要素を追加する
    addTarget.appendChild(li);
    addTarget.appendChild(backBotton);
    // 完了したTODOの親要素に追加する
    document.getElementById("complete-list").appendChild(addTarget);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  div.appendChild(doneButton);
  div.appendChild(deleteButton);

  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
