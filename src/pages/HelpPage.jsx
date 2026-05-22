export default function HelpPage() {
  return (
    <div className="help-page">
      <div className="help-header">
        <h2>使い方ガイド</h2>
        <p className="help-subtitle">チームタスク管理アプリの基本操作をご説明します</p>
      </div>

      {/* 基本の流れ */}
      <section className="help-section">
        <h3 className="help-section-title">
          <span className="help-step-badge">STEP</span> 基本の流れ
        </h3>
        <div className="help-steps">
          <div className="help-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-title">メンバーを登録する</div>
              <div className="step-desc">右上の「メンバー」タブからチームメンバー全員の名前を登録します。担当者・依頼者の選択に使います。</div>
            </div>
          </div>
          <div className="help-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-title">タスクを追加する</div>
              <div className="step-desc">「＋ タスクを追加」ボタンからタスクを登録します。スマホでは右下の大きな「＋」ボタンを使います。</div>
            </div>
          </div>
          <div className="help-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-title">ステータスを更新する</div>
              <div className="step-desc">タスクカードのステータスバッジをクリックするだけで「未着手→進行中→完了」と更新できます。</div>
            </div>
          </div>
        </div>
      </section>

      {/* タスク入力項目 */}
      <section className="help-section">
        <h3 className="help-section-title">タスクの入力項目</h3>
        <div className="help-table">
          <div className="help-row header-row">
            <div className="help-col-label">項目</div>
            <div className="help-col-desc">説明</div>
            <div className="help-col-req">必須</div>
          </div>
          <div className="help-row">
            <div className="help-col-label">タスク内容</div>
            <div className="help-col-desc">何をすべきか、タスクの内容を入力します</div>
            <div className="help-col-req"><span className="badge-required">必須</span></div>
          </div>
          <div className="help-row">
            <div className="help-col-label">詳細</div>
            <div className="help-col-desc">タスクの詳しい説明や補足情報を入力します</div>
            <div className="help-col-req"><span className="badge-optional">任意</span></div>
          </div>
          <div className="help-row">
            <div className="help-col-label">担当者</div>
            <div className="help-col-desc">このタスクを担当するメンバーを選びます</div>
            <div className="help-col-req"><span className="badge-optional">任意</span></div>
          </div>
          <div className="help-row">
            <div className="help-col-label">依頼者</div>
            <div className="help-col-desc">タスクを依頼した人の名前を自由に入力します</div>
            <div className="help-col-req"><span className="badge-optional">任意</span></div>
          </div>
          <div className="help-row">
            <div className="help-col-label">期日</div>
            <div className="help-col-desc">タスクの締め切り日を設定します。期限を過ぎると赤く表示されます</div>
            <div className="help-col-req"><span className="badge-optional">任意</span></div>
          </div>
          <div className="help-row">
            <div className="help-col-label">優先度</div>
            <div className="help-col-desc">タスクの優先度を「高・中・低」から選びます</div>
            <div className="help-col-req"><span className="badge-required">必須</span></div>
          </div>
          <div className="help-row">
            <div className="help-col-label">ステータス</div>
            <div className="help-col-desc">現在の進捗状況を「未着手・進行中・完了」から選びます</div>
            <div className="help-col-req"><span className="badge-required">必須</span></div>
          </div>
          <div className="help-row">
            <div className="help-col-label">備考</div>
            <div className="help-col-desc">引継ぎ情報や注意点など、補足事項を入力します</div>
            <div className="help-col-req"><span className="badge-optional">任意</span></div>
          </div>
        </div>
      </section>

      {/* 優先度・ステータスの見方 */}
      <section className="help-section">
        <h3 className="help-section-title">バッジの見方</h3>
        <div className="help-badges-grid">
          <div className="help-badge-group">
            <div className="help-badge-title">優先度</div>
            <div className="help-badge-list">
              <div className="help-badge-item">
                <span className="badge priority-high">優先度：高</span>
                <span className="help-badge-note">早急に対応が必要なタスク</span>
              </div>
              <div className="help-badge-item">
                <span className="badge priority-medium">優先度：中</span>
                <span className="help-badge-note">通常の優先度のタスク</span>
              </div>
              <div className="help-badge-item">
                <span className="badge priority-low">優先度：低</span>
                <span className="help-badge-note">余裕があれば対応するタスク</span>
              </div>
            </div>
          </div>
          <div className="help-badge-group">
            <div className="help-badge-title">ステータス（クリックで更新）</div>
            <div className="help-badge-list">
              <div className="help-badge-item">
                <span className="badge status-todo">未着手</span>
                <span className="help-badge-note">まだ着手していない</span>
              </div>
              <div className="help-badge-item">
                <span className="badge status-in_progress">進行中</span>
                <span className="help-badge-note">現在対応中</span>
              </div>
              <div className="help-badge-item">
                <span className="badge status-done">完了</span>
                <span className="help-badge-note">対応が完了した</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 便利な機能 */}
      <section className="help-section">
        <h3 className="help-section-title">便利な機能</h3>
        <div className="help-tips">
          <div className="help-tip">
            <div className="tip-icon">🔍</div>
            <div className="tip-content">
              <div className="tip-title">検索・フィルター</div>
              <div className="tip-desc">タスク名で検索したり、ステータス・優先度・担当者でしぼり込みができます。「完了を非表示」で完了済みを隠せます。</div>
            </div>
          </div>
          <div className="help-tip">
            <div className="tip-icon">⚡</div>
            <div className="tip-content">
              <div className="tip-title">ステータスをワンクリック更新</div>
              <div className="tip-desc">タスクカードの「未着手」「進行中」「完了」バッジをクリックするだけで次のステータスに切り替わります。編集画面を開く必要はありません。</div>
            </div>
          </div>
          <div className="help-tip">
            <div className="tip-icon">⚠️</div>
            <div className="tip-content">
              <div className="tip-title">期限アラート</div>
              <div className="tip-desc">期日を過ぎたタスクはカード全体が赤くハイライトされます。期日の3日前はオレンジ色で表示されます。</div>
            </div>
          </div>
          <div className="help-tip">
            <div className="tip-icon">✏️</div>
            <div className="tip-content">
              <div className="tip-title">タスクの編集・削除</div>
              <div className="tip-desc">タスクカード右上の「⋮」メニューから編集・削除ができます。</div>
            </div>
          </div>
          <div className="help-tip">
            <div className="tip-icon">🔄</div>
            <div className="tip-content">
              <div className="tip-title">リアルタイム同期</div>
              <div className="tip-desc">誰かがタスクを追加・更新すると、ページをリロードしなくても全員の画面に自動で反映されます。</div>
            </div>
          </div>
          <div className="help-tip">
            <div className="tip-icon">📱</div>
            <div className="tip-content">
              <div className="tip-title">スマホ対応</div>
              <div className="tip-desc">PCでもスマホでも同じURLで使えます。ログイン不要でURLを知っていれば誰でもアクセスできます。</div>
            </div>
          </div>
        </div>
      </section>

      {/* 並び順の説明 */}
      <section className="help-section">
        <h3 className="help-section-title">タスクの並び順</h3>
        <div className="help-order">
          <div className="help-order-item">
            <span className="order-num">①</span>
            <span>期限超過のタスクが最優先で表示</span>
          </div>
          <div className="help-order-item">
            <span className="order-num">②</span>
            <span>未着手 → 進行中 → 完了 の順</span>
          </div>
          <div className="help-order-item">
            <span className="order-num">③</span>
            <span>同じステータス内は優先度の高い順</span>
          </div>
          <div className="help-order-item">
            <span className="order-num">④</span>
            <span>同じ優先度内は期日の早い順</span>
          </div>
        </div>
      </section>
    </div>
  )
}
