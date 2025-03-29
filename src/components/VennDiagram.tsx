// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const JSC: any;
import { useEffect } from "react";
import { Profile } from "./pages/ComparePage";

interface VennDiagramProps {
  user1: Profile;
  user2: Profile;
  commonMoviesCount: number;
}

function VennDiagram({ user1, user2, commonMoviesCount }: VennDiagramProps) {
  const { displayName: name1, moviesCount: count1 } = user1;
  const { displayName: name2, moviesCount: count2 } = user2;
  useEffect(() => {
    JSC.chart("chartDiv", {
      debug: true,
      type: "venn",
      box: { fill: "rgba(0,0,0,0)" },
      defaultPoint: {
        focusGlow: false,
        label: { autoWrap: true },
        tooltip: "%name watched %yValue movies",
      },
      series: [
        {
          points: [
            {
              name: name2,
              y: count2,
              color: "#009966",
            },
            {
              name: name1,
              y: count1,
              color: "#155dfc",
            },
            {
              name: "Both",
              sets: [name1, name2],
              y: commonMoviesCount,
              color: "#0b7bb1",
              label_text: " ",
            },
          ],
        },
      ],
    });
  }, [commonMoviesCount, count1, count2, name1, name2]);

  return <div id="chartDiv" className="h-64" />;
}
export default VennDiagram;
