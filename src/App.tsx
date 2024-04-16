import { useRef, useState } from "react";
import "./App.css";

function App() {
  const weightRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const [bmi, setBmi] = useState<number>(0);

  const calculateBMI = () => {
    const weight = weightRef.current ? parseFloat(weightRef.current?.value) : 0;
    const height = heightRef.current ? parseFloat(heightRef.current?.value) : 0;
    const bmi = weight / (height / 100) ** 2;

    setBmi(bmi);
  };

  const resetBMI = () => {
    if (weightRef.current && heightRef.current) {
      weightRef.current.value = "";
      heightRef.current.value = "";
      /* Reset BMI value to 0 */
      setBmi(0);
    }
  };

  const checkBmiResult = () => {
    if (bmi === 0) return "-";
    switch (true) {
      case bmi < 18.5:
        return "น้ำหนักน้อย / ผอม";
      case bmi < 22.9:
        return "ปกติ (สุขภาพดี)";
      case bmi < 24.9:
        return "ท้วม / โรคอ้วนระดับ 1";
      case bmi < 29.9:
        return "อ้วน / โรคอ้วนระดับ 2";
      case bmi >= 30:
        return "อ้วนมาก / โรคอ้วนระดับ 3";
      default:
        return "-";
    }
  };

  const getBmiResultColor = () => {
    if (bmi < 18.5) return "gray";
    if (bmi < 22.9) return "green";
    if (bmi < 24.9) return "yellow";
    if (bmi < 29.0) return "orange";
    if (bmi >= 30) return "red";
    return "gray";
  };

  return (
    <>
      <div className="container">
        <h1>BMI Calculator</h1>
        <p>
          <strong>โปรแกรมคํานวณค่าดัชนีมวลกาย - BMI</strong>
        </p>

        <div className="space-bottom">
          <label htmlFor="weight">นำหนัก (kg.) </label>
          <input
            type="number"
            name="weight"
            min={0}
            ref={weightRef}
            autoComplete="off"
          />
        </div>
        <div className="space-bottom">
          <label htmlFor="height">ส่วนสูง (cm.) </label>
          <input
            type="text"
            name="height"
            min={0}
            ref={heightRef}
            autoComplete="off"
          />
        </div>
        <div className=" space-bottom ">
          <div className="button">
            <button
              className="button-calculateBmi"
              type="button"
              onClick={calculateBMI}
            >
              คำนวนค่า BMI
            </button>
            <button
              className="button-resetBmi"
              type="button"
              onClick={resetBMI}
            >
              คือค่า BMI
            </button>
          </div>
        </div>

        <div className="space-bottom">
          <p>ค่า BMI คือ : {bmi ? bmi.toFixed(2) : 0.0}</p>
          <p>
            ผลลัพธ์ : &nbsp;
            <span className={getBmiResultColor()}>{checkBmiResult()}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
