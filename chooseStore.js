import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import pTd from './app/common/utils/unit'
const screenHeight = Dimensions.get('window').height;

export default class test2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showFilter: ""
        }
    }
    chooseFilter(text) {
        this.setState({
            showFilter: text
        })
    }
    /* 筛选选项 */
    fliterOption() {
        return (
            showFilter && (
                <TouchableOpacity onPress={()=>this.chooseFilter()}>
                    <View style={styles.maskChoose}>
                        {/* 区域选择 */}
                        {
                            showFilter == "area" && (
                                <View>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        <TouchableOpacity>
                                            <View style={styles.filterStore}>
                                                <Text>维修厂</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            )
                        }
                        {/* 排序 */}
                        {
                            showFilter == "order" && (
                                <View>
                                    <Text>默认排序</Text>
                                </View>
                            )
                        }
                        {/* 门店 */}
                        {
                            showFilter == "store" && (
                                <View>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        <TouchableOpacity>
                                            <View style={[styles.filterStore, { borderWidth: pTd(2), borderColor: "gray" }]}>
                                                <Text>维修厂</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <View style={[styles.filterStoreOperate, { borderTopWidth: pTd(1), borderColor: "#ddd" }]}>
                                                <Text>重置</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={[styles.filterStoreOperate, { backgroundColor: "red" }]}>
                                                <Text style={{ color: "#fff" }}>确定</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </TouchableOpacity>
            )
        )
    }
    render() {
        const { showFilter } = this.state
        return (
            <View>
                {/* filter */}
                <View style={{ height: pTd(60) }}>
                    <TouchableOpacity onPress={() => this.chooseFilter("area")}>
                        <View>
                            <Text >常州市</Text>
                            <Image source={require(WstImages.select_icon)} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.chooseOrder("order")}>
                        <View>
                            <Text>默认排序</Text>
                            <Image source={require(WstImages.select_icon)} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.chooseOrder("store")}>
                        <View>
                            <Text>筛选</Text>
                            <Image source={require(WstImages.select_icon)} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/*  */}
                <View>
                    <Image style={{ width: pTd(100), height: pTd(100) }} source={{ uri: "" }} />
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text numberOfLines={1} style={{ fontSize: pTd(38), width: pTd(400), fontWeight: "600" }}>复合组件复合组件复合组件复合组件</Text>
                            <Text style={{ color: "origin" }}>5.81km</Text>

                        </View>
                        <Text numberOfLines={1} style={{ fontSize: pTd(32), marginVertical: pTd(10), width: pTd(450), }}>复合组件复合组件复合组件复合组件.81km</Text>
                        <View style={{ justifyContent: "space-between" }}>
                            <Text style={{ fontSize: pTd(28), }}>5.81km</Text>
                            <TouchableOpacity onPress={() => { }}>
                                <View style={{ borderWidth: pTd(2), width: pTd(100), height: pTd(60), justifyContent: "center", alignItems: "center" }}>
                                    <Text>选择</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    maskChoose: {
        top: screenHeight - pTd(60),
        position: "absolute",
        left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 1
    },
    filterStore: {
        width: pTd(220), height: pTd(80), justifyContent: "center", alignItems: "center",

    },
    filterStoreOperate: {
        width: "50",
        height: pTd(100), justifyContent: "center", alignItems: "center",
    }
})
