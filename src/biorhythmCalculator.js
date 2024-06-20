export const calculateBiorhythms = (birthDate, targetDate) => {
  const birth = new Date(birthDate);
  const target = new Date(targetDate);
  const diffTime = Math.abs(target - birth);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const physical = Math.sin((2 * Math.PI * diffDays) / 23);
  const emotional = Math.sin((2 * Math.PI * diffDays) / 28);
  const mental = Math.sin((2 * Math.PI * diffDays) / 33);

  return {
    physical,
    emotional,
    mental,
  };
};

export const generateBiorhythmSeries = (birthDate, targetDate) => {
  const birth = new Date(birthDate);
  const target = new Date(targetDate);

  const labels = [];
  const physicalData = [];
  const emotionalData = [];
  const mentalData = [];

  for (let i = -15; i <= 15; i++) {
    const date = new Date(target);
    date.setDate(date.getDate() + i);
    const diffTime = Math.abs(date - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    labels.push(date);
    physicalData.push(Math.sin((2 * Math.PI * diffDays) / 23));
    emotionalData.push(Math.sin((2 * Math.PI * diffDays) / 28));
    mentalData.push(Math.sin((2 * Math.PI * diffDays) / 33));
  }

  return {
    labels,
    datasets: [
      {
        label: "Physical",
        data: physicalData,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Emotional",
        data: emotionalData,
        borderColor: "green",
        fill: false,
      },
      {
        label: "Mental",
        data: mentalData,
        borderColor: "blue",
        fill: false,
      },
    ],
  };
};
