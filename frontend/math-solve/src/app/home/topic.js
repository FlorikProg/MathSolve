export default function Topic() {
  const topic = [
    { name: "Функции", index: 2 }, 
    { name: "Комбинаторика", index: 2 },
    { name: "Уравнения", index: 2 },
    { name: "Неравенства", index: 2 },
    { name: "Хз что", index: 2 },
    { name: "Еще что-то", index: 2 },
  ];
  
  return (
    <div className="px-10 pt-3">
      <div className="flex flex-row flex-wrap gap-3">
        {topic.map((topic, index) => (
          <p
            key={index}
            className="text-sm bg-default_bg border border-gray-200 text-foreground px-4 py-3 rounded-full cursor-pointer transition-colors duration-300 hover:bg-default_button_bg hover:text-black"
          >
            {topic.name}
          </p>
        ))}
      </div>
    </div>
  );
}
