export default function getPointSize(Stamomkret) {

    return  Stamomkret < 250 ? 3 :
            Stamomkret >= 250 && Stamomkret < 500 ? 5 :
            Stamomkret >= 500 && Stamomkret < 750 ? 7 :
            Stamomkret >= 750 ? 10 :
            3;
}
