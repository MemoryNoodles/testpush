
import React, { Component } from "react"
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import cityDatas from "./cityIndex";
import cityTestDatas from "./changeCity"

let cityDataList = cityTestDatas.cityList;
let cityLen = Object.keys(cityDataList);

let defaultHotCityArray = cityTestDatas.hotCity;

const { width, height } = Dimensions.get('window');
// 适配性函数
const UIWIDTH = 750;

let hotCitys = [];
// let defaultHotCityArray = [
//   { cityCode: "310000", cityName: "上海市" },
//   { cityCode: "440300", cityName: "深圳市" },
//   { cityCode: "110000", cityName: "北京市" },
//   { cityCode: "440100", cityName: "广州市" },
// ];
// let defaultHotCityArray = [
//   { cityCode: "310000", cityName: "上海市" },
//   { cityCode: "440300", cityName: "深圳市" },
//   { cityCode: "110000", cityName: "北京市" },
//   { cityCode: "440100", cityName: "广州市" },
// ];

const sectionWidth = 20;
const statusHeight = 88;
const sectionTopBottomHeight = 60;
// const sectionItemHeight = (height - sectionTopBottomHeight * 2 - statusHeight) / cityDatas.length;
const ROW_HEIGHT = 48;

let totalHeight = [];
let letters = [];

export function rx(UIPX) {
  return Math.round(UIPX * width / UIWIDTH);
}

export default class cityList extends Component {
  constructor(props) {
    super(props);
    totalHeight = this._gotTotalHeightArray();
    letters = this._gotLettersArray();
  }

  state = {
    currentCity: "正在定位...",
    isLocation: false,
    sectionListDatas: cityDatas,
    letterWords: 'A'
  };
   
  // 获取每个字母区域的高度
  _gotTotalHeightArray() {
    let totalArray = []
  
    for (let i = 0; i < cityLen.length; i++) {
      let eachHeight = ROW_HEIGHT * (cityDataList[cityLen[i]].length + 1);
      totalArray.push(eachHeight);
    }
    /* 本地数据格式 */
    // for (let i = 0; i < cityDatas.length; i++) {
    //   let eachHeight = ROW_HEIGHT * (cityDatas[i].data.length + 1);
    //   totalArray.push(eachHeight);
    // }
    return totalArray
  }

  // 获取字母列表头
  _gotLettersArray() {
    let LettersArray = []
    
    for (let i = 0; i < cityLen.length; i++) {
      let element = cityLen[i];
      LettersArray.push(element.title)
    }
    // for (let i = 0; i < cityDatas.length; i++) {
    //   let element = cityDatas[i];
    //   LettersArray.push(element.title)
    // }
    return LettersArray
  }

  componentWillMount() {
    this.gotCurrentLocation();
    this.requestHotCityList();
  }

  async gotCurrentLocation() {
    /* 
    {
"status": "1",
"msg": "定位成功",
"data": {
  "city": "上海",
  "cityId": "321"
}
}
    */
    let res = {
      "status": "1",
      "msg": "定位成功",
      "data": {
        "city": "上海",
        "cityId": "321"
      }
    }
    this.setState({
      currentCity: res.data.city,
      isLocation: true
    })
  }

  requestHotCityList() {
    hotCitys = defaultHotCityArray
  }

  currentCityAction(name) {

  }

  // 点击右侧字母滑动到相应位置
  scrollToList(item, index) {
    let position = 0;
    for (let i = 0; i < index; i++) {
      position += totalHeight[i]
    }
    this.refs.ScrollView.scrollTo({ y: position })
  }

  /*右侧索引*/
  _renderSideSectionView() {
    // const sectionItem = cityDatas.map((item, index) => {
    //   return (
    //     <Text onPress={() => this.scrollToList(item, index)} key={index} style={styles.rightSideText}>
    //       {item.sortLetters}
    //     </Text>
    //   )
    // });
    const sectionItem = cityLen.map((item, index) => {
      return (
        <Text onPress={() => this.scrollToList(item, index)} key={index} style={styles.rightSideText}>
          {item}
        </Text>
      )
    });

    return (
      <View style={styles.rightSlideArea} ref="sectionItemView">
        {sectionItem}
      </View>
    );
  }

  // 渲染城市列表
  _renderCityList() {
    let lists = [];
    // for (let i = 0; i < cityDatas.length; i++) {
    //   let sections = cityDatas[i];
    //   let header =
    //     <View key={sections.title} style={styles.cityLetterBox}>
    //       <Text style={styles.cityLetterText}>{sections.sortLetters}</Text>
    //     </View>;
    //   lists.push(header);

    //   for (let j = 0; j < sections.data.length; j++) {
    //     let element = sections.data[j];
    //     let cityCell =
    //       <TouchableOpacity key={element.name + j} onPress={() => {
    //         this.selectCity(element)
    //       }}>
    //         <View style={styles.cityTextBox}>
    //           <Text style={styles.cityTextStyle}>{element.name}</Text>
    //         </View>
    //       </TouchableOpacity>;

    //     lists.push(cityCell);
    //   }
    // }
    for (let i = 0; i < cityLen.length; i++) {
      let sections = cityLen[i];
      let header =
        <View key={sections} style={styles.cityLetterBox}>
          <Text style={styles.cityLetterText}>{sections}</Text>
        </View>;
      lists.push(header);

      for (let j = 0; j < cityDataList[sections].length; j++) {
        let element = cityDataList[sections][j];
        let cityCell =
          <TouchableOpacity key={element.areaName + j} onPress={() => {
            this.selectCity(element)
          }}>
            <View style={styles.cityTextBox}>
              <Text style={styles.cityTextStyle}>{element.areaName}</Text>
            </View>
          </TouchableOpacity>;

        lists.push(cityCell);
      }
    }
    return lists;
  }

  selectCity(cityItem) {
    // alert(cityItem.cityCode);
    console.log(cityItem)
  }

  renderHotCityArray(hotCityArray) {
    let eleArray = [];

    let subArray = hotCityArray.slice(0, 12);
    for (let index = 0; index < subArray.length; index++) {
      const element = subArray[index];
      const ele =
        <TouchableOpacity key={element.cityCode} onPress={() => {
        }}>
          <View style={[styles.textView, { marginTop: 10 }]}>
            <Text style={{ color: "#333333", fontSize: 14, }}>{element.areaName}</Text>
          </View>
        </TouchableOpacity>;
      eleArray.push(ele);

    }
    return eleArray;
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#FFFFFF", }} ref='topViews'>
          <Text style={styles.titleText}>当前定位城市</Text>
          <View style={styles.currentView}>
            <TouchableOpacity onPress={() => {
              this.currentCityAction(this.state.currentCity)
            }}
              style={{ width: 100, }}>
              <View style={[styles.textView, { marginLeft: 15, width: 100, }]}>
                <Text style={{ color: "#C49225", fontSize: 14, }}>{this.state.currentCity}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.titleText}>热门城市</Text>
          <View style={styles.hotView}>
            {this.renderHotCityArray(hotCitys)}
          </View>

        </View>

        <ScrollView style={{ backgroundColor: '#FFFFFF', }} ref="ScrollView">
          {this._renderCityList()}
        </ScrollView>

        {this._renderSideSectionView()}
      </View>


    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#ECEBED"
  },
  titleText: {
    marginLeft: 30,
    marginTop: 20,
    color: "#999999",
    fontSize: 13,
  },
  currentView: {
    marginTop: 10,
    paddingBottom: 10
  },
  textView: {
    minWidth: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  },
  hotView: {
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 25,
    paddingBottom: 20,
    marginBottom: 15,
  },

  rightSlideArea: {
    position: 'absolute',
    width: sectionWidth,
    height: height - sectionTopBottomHeight * 2, right: 5,
    top: 0,
    marginTop: sectionTopBottomHeight,
    marginBottom: sectionTopBottomHeight,
  },
  rightSideText: {
    textAlign: 'center',
    alignItems: 'center',
    // height: sectionItemHeight,
    // lineHeight: sectionItemHeight,
    height: 20,
    lineHeight: 20,
    color: '#C49225'
  },
  cityLetterBox: {
    height: ROW_HEIGHT,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },
  cityLetterText: {
    color: "#999",
    fontSize: 17,
    marginLeft: 20,
  },
  cityTextBox: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
  },
  cityTextStyle: {
    color: '#333333',
    fontSize: 14,
  },


});