// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const JSC: any;
import { useEffect } from "react";
type User = {
  name: string;
  moviesStat: number;
};

type Props = {
  user1: User;
  user2: User;
  commonMoviesStat: number;
};

function VennDiagram({ user1, user2, commonMoviesStat }: Props) {
  const { name: name1, moviesStat: moviesStat1 } = user1;
  const { name: name2, moviesStat: moviesStat2 } = user2;
  useEffect(() => {
    JSC.chart("chartDiv", {
      debug: true,
      type: "venn",
      box: { fill: "rgba(0,0,0,0)" },
      defaultPoint: {
        focusGlow: false,
        label: { autoHide: true, autoWrap: true },
        tooltip: "%name watched %yValue movies",
      },
      series: [
        {
          points: [
            {
              name: name2,
              y: moviesStat2,
              color: "#009966",
            },
            {
              name: name1,
              y: moviesStat1,
              color: "#155dfc",
            },
            {
              name: "Both",
              sets: [name1, name2],
              y: commonMoviesStat,
              color: "#0b7bb1",
              label_text: " ",
            },
          ],
        },
      ],
    });
  }, [commonMoviesStat, moviesStat1, moviesStat2, name1, name2]);

  return <div id="chartDiv" className="h-64" />;
}
export default VennDiagram;
