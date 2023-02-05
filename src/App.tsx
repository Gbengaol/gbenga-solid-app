import { Component, lazy } from "solid-js";
import { Routes, Route, A } from "@solidjs/router";

const HotelManagement = lazy(() => import("./HotelManagement/HotelManagement"));
const TodoAppLanding = lazy(() => import("./TodoApp"));

const App: Component = () => {
  return (
    <div class="px-10 py-4">
      <nav>
        <ul>
          <A href="/">Todo</A> | <A href="/hotel">Hotel</A>
        </ul>
      </nav>
      <img
        src="../logo.png"
        alt="Logo"
        class="h-24 w-24 mb-3 mx-auto rounded-full"
      />

      <Routes>
        <Route path="/" component={TodoAppLanding} />
        <Route path="/hotel" component={HotelManagement} />
      </Routes>
    </div>
  );
};

export default App;
