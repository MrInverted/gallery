export default function List() {
  return (
    <div className="py-5 mt-5">
      <hr className="my-3" />
      <h4>Реализованный функционал</h4>
      <ul className="list-group">
        <li className="list-group-item">Добавление новой карточки</li>
        <li className="list-group-item">Загрузка и сохрание фотографии через formidable</li>
        <li className="list-group-item">Фильтрация по категория</li>
        <li className="list-group-item">Поиск по заголовку</li>
        <li className="list-group-item">Пагинация с возможностью выбора кол-ва элементов на странице</li>
        <li className="list-group-item">Открытие карточки</li>
        <li className="list-group-item">Регистрация и авторизация через jwt и с выводом ошибки в форме</li>
        <li className="list-group-item">Удаление карточки, если авторизован, и если логин пользователя создавшего совпадает с удаляющим</li>
      </ul>
    </div>
  )
}
