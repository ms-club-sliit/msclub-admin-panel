import "react-redux";
import { AppState } from "../store/reducer";

declare module "react-redux" {
	interface DefaultRootState extends AppState {}
}
