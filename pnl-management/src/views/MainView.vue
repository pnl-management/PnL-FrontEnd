<template>
  <div>
    <table width="100%" style="border-spacing: 0px;">
      <tr>
        <th colspan="2">
          <Header />
        </th>
      </tr>
      <tr>
        <th width="15%" style="height: 89vh;">
          <Navigation />
        </th>
        <th>
          <router-view/>
        </th>
      </tr>
    </table>
  </div>
</template>
<script>
import Header from "../components/Header";
import Navigation from "../components/Navigation";
export default {
    components: {
        Header: Header,
        Navigation: Navigation,
  },
};
</script>