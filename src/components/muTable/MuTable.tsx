import { FunctionComponent } from 'react'
import { pad } from '../../utils'
import style from './MuTable.module.css'

export interface TableColumnType {
  // 列名
  title: string
  //列数据在数据项中对应的路径，支持通过数组查询嵌套路径
  dataIndex: string
  //React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
  key?: string
  render?: (data: any, idx: number) => JSX.Element
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sorter?: (a: any, b: any) => number
}

interface TableProps {
  columns: TableColumnType[]
  data: any[]
  showIdx?: boolean
  onColDoubleClick?: (data: any, idx: number) => void
}

const MuTable: FunctionComponent<TableProps> = (props) => {
  const { columns, data, showIdx, onColDoubleClick } = props
  return (
    <div className={style.muTable}>
      <table>
        <thead>
          <tr className={`${style.muTableHeader}`}>
            {showIdx === true && (
              <th style={{ textAlign: 'center' }}>
                <div></div>
              </th>
            )}
            {columns.map((item) => {
              return (
                <th key={item.title} style={{ width: item.width, textAlign: item.align }}>
                  {item.title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => {
            return (
              <tr
                onDoubleClick={() => onColDoubleClick && onColDoubleClick(item, idx)}
                key={item.id}
                className={`${style.muTableItem}`}
              >
                {showIdx === true && (
                  <td>
                    <div style={{ width: 30, textAlign: 'center' }}>{pad(idx)}</div>
                  </td>
                )}
                {columns.map((col) => {
                  return (
                    <td key={col.title} style={{ textAlign: col.align }}>
                      {col.render ? col.render(item, idx) : item[col.dataIndex]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MuTable
