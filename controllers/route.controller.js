exports.create = async (req, res, next) => {
  try {
    //получение данных запросов маршрута из тела запроса(пример)
    const { startPoint, endPoint, distance } = req.body
    const newRoute = { startPoint, endPoint, distance, id: Date.now() } //-Должен использоваться id из БД + ЭТО ЗАГЛУШКА И НЕПОНИМАЮ ЧТО ДЕЛАТЬ
    //успешный ответ
    res.status(201).json({
      success: true,
      data: newRoute,
    })
    //обработка ответа
  } catch (error) {
    //ошибка
    next(error)
  }
}
