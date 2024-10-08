import { Component, FC } from "react";
import TaskTimer from "../TaskTimer/index";
import { Graph } from "../GraphLibrary/Graph";
// import  Matrix  from '../MatrixLibrary/Matrix';
// import { MatrixController } from '../MatrixLibrary/MatrixController';
import cytoscape from "cytoscape";
import { GraphGenerator } from "../GraphLibrary/GraphGenerator";
// import { GraphGenerator_1 } from "../GraphLibrary/GraphGenerator";
import { GraphController } from "../GraphLibrary/GraphController";
import ToolBar from "../Toolbar/ToolBar";

interface IProps {}

interface IState<T1, T2> {
  graph: Graph<T1, T2>;
  task_graph: Graph<T1, T2>;
}

export class Template<T1, T2> extends Component<IProps, IState<T1, T2>> {
  visualizing_policy = "circle";

  constructor(props: IProps) {
    super(props);

    let g: Graph<T1, T2> = this.generateGraph();
    let t_g: Graph<T1, T2> = this.generateTaskGraph();
    this.state = {
      graph: g,
      task_graph: t_g,
    };
  }

  public render() {
    const Task: any = this.task();

    return (
      <div id="wrap">
        {
          <div>
            <div className={"MainRow"}>
              {this.isGraphModule() && (
                <GraphController
                  id={"cy1"}
                  className="GraphCell"
                  graph={this.state.graph}
                  visualization_policy={this.visualizing_policy}
                  is_nodeid_visible={this.isNodeNameVisible()}
                  is_weights_visible={this.isEdgeWeightVisible()}
                />
              )}
              {!this.isGraphModule() && (
                <div id={"matrix"} className={"GraphCell"}>
                  {/* <MatrixController
                                matrix={this.generateMatrix()}/>                                                                    */}
                </div>
              )}
              <div id={"drtfghbjk"} className={"TaskCell"}>
                <p>Задание</p>
                <Task />
              </div>
              <div id={"drtfghbjk"} className={"TaskCellGraph"}>
                <GraphController
                  id={"cy2"}
                  className="TaskCellGraph"
                  graph={this.state.task_graph}
                  visualization_policy={this.visualizing_policy}
                  is_nodeid_visible={this.isNodeNameVisible()}
                  is_weights_visible={this.isEdgeWeightVisible()}
                />
              </div>
              <div className={"ToolCell"}>
                <ToolBar />
              </div>
            </div>
            <div className={"LeftBottom"}>
              <TaskTimer timeSeconds={100} onTimerExpire={this.nextStage} />
            </div>
          </div>
        }
      </div>
    );
  }

  protected nextStage() {
    console.log("next stage");
  }

  protected task() {
    return () => <p>Это пустой компонент задания</p>;
  }

  // protected task_matrix() {
  //   return () => <p>Это пустой компонент задания</p>;
  // }

  protected generateGraph() {
    let graph: Graph<T1, T2> = GraphGenerator.random(0, 0);
    return graph;
  }

  protected generateTaskGraph() {
    let task_graph: Graph<T1, T2> = GraphGenerator.random(0, 0); //GraphGenerator.random2components(4, 4, 0.3);
    return task_graph;
  }

  protected isGraphModule() {
    return true;
  }

  protected generateMatrix() {
    // let matrix: Matrix = new Matrix(1, 1, []);
    // return matrix;
  }

  protected isGraphModified() {
    return true;
  }
  protected isGraphRepainted() {
    return false;
  }
  protected isGraphAdjRepainted() {
    return false;
  }
  protected isGraphNodeRenamed() {
    return true;
  }
  protected isGraphReweight() {
    return false;
  }
  protected isVisualizingPolicyChangeble() {
    return false;
  }

  protected isNodeNameVisible() {
    return true;
  }
  protected isEdgeWeightVisible() {
    return false;
  }

  componentDidMount() {
    let vp = document.getElementById(
      "visualization-policy"
    ) as HTMLSelectElement;
    vp?.addEventListener("change", () => {
      this.visualizing_policy = vp.value;
      this.forceUpdate();
    });
  }
}
